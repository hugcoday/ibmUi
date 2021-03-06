define(function (require) {
    var app = require('../../js/app');
    var feather = require('feather');
    var moment = require('moment');

    app.controller('cameraCtrl', function($scope) {
        moment.locale("zh_cn");
        $scope.is_debug = settings.is_debug;
        global.on_load_func();    // 加载隐藏div数据并保存到js的session变量

        $scope.$watch('$viewContentLoaded', function () {
            global.on_loaded_func($scope);    // 显示页面内容
        });

        refreshInterval = 5*60*1000; // N 分钟刷新所有电站数据

        $scope.$watch('$viewContentLoaded', function() {
            //feather.replace();
            global.on_loaded_func($scope);    // 显示页面内容

            // 弹框绑定关闭事件
            $($scope.data.videoModalId).on("click", function(){
                $scope.data.cameraSelected = null;
                $($scope.data.videoModalId).hide();
            });
        });

        // 最后执行
        setTimeout(function(){
            $scope.getDatas();
        }, 0);

        $scope.data = {
            user: global.read_storage("session", "user"),
            curBuilding: global.read_storage("session", "building"),
            buildingList: global.read_storage("session", "buildingList"),

            pageTitle: settings.pageTitle,
            headLeft: "安全·舒适·节能",
            headRight: moment().format("YYYY-MM-DD dddd"),
            
            floor: (global.request("fl") != "" && global.request("fl") > 0) ? global.request("fl") : "2",
            cameraSelected : null,
            fmt: "YYYY-MM-DD",
            videoModalId: "#videoModal",

            floorSelected : null,
            cameraSelected : null,
            floors: [],
        }

        $scope.displayFloor = function(floor) {
            $scope.data.floorSelected = floor;
        }

        $scope.displayCamera = function(camera) {
            $scope.data.cameraSelected = camera;
            var $obj = $($scope.data.videoModalId);
            $obj.addClass("show");
            $obj.show();
            document.getElementById("videoIframe").location.reload();
        }

        $scope.getDatas = function() {
            $scope.$apply(function(){
                $scope.data.floors = [
                    // {
                    //     id: 1,
                    //     name: "所有楼层",
                    //     points: [
                    //         {
                    //             id: 1,
                    //             name: "顶楼楼东",
                    //             video: "video.html",
                    //             style: {"margin-left": "200px", "margin-top": "120px" }
                    //         },
                    //         {
                    //             id: 2,
                    //             name: "二楼楼中",
                    //             video: "video.html",
                    //             style: {"margin-left": "620px", "margin-top": "400px" }
                    //         }
                    //     ],
                    //     resource: "./uploads/floor-all.png",
                    // },
                    {
                        id: 2,
                        name: "楼层一",
                        points: [
                            {
                                id: 1,
                                name: "大门口",
                                video: "./video.html?out_door01.mp4",
                                iconClass: "icons icon-camera",
                                style: {"margin-left": "620px", "margin-top": "400px" }
                            },
                            {
                                id: 2,
                                name: "车库入口",
                                iconClass: "icons icon-camera",
                                video: "./video.html?under_floor_door01.mp4",
                                style: {"margin-left": "630px", "margin-top": "600px" }
                            },
                            {
                                id: 3,
                                name: "电梯间",
                                iconClass: "icons icon-camera",
                                video: "./video.html?1f_elevator01.mp4",
                                style: {"margin-left": "220px", "margin-top": "130px" }
                            }
                        ],
                        resource: "./uploads/floor-1.png",
                    },
                    {
                        id: 3,
                        name: "楼层二",
                        points: [
                            {
                                id: 3,
                                name: "电梯间",
                                iconClass: "icons icon-camera",
                                video: "./video.html?1f_elevator01.mp4",
                                style: {"margin-left": "120px", "margin-top": "235px" }
                            }
                        ],
                        resource: "./uploads/floor-2.png",
                    },
                    {
                        id: 4,
                        name: "楼顶",
                        points: [
                            {
                                id: 3,
                                name: "电梯间",
                                iconClass: "icons icon-camera",
                                video: "./video.html?1f_elevator01.mp4",
                                style: {"margin-left": "520px", "margin-top": "230px" }
                            }
                        ],
                        resource: "./uploads/floor-t1.png",
                    },
                    {
                        id: 5,
                        name: "配电房",
                        points: [
                            {
                                id: 1,
                                name: "配电房中",
                                video: "video.html?distribution_room01.mp4",
                                style: {"margin-left": "200px", "margin-top": "120px" }
                            }
                        ],
                        resource: "./uploads/floor-b1.png",
                    }
                ];

                // 选中当前楼层
                $scope.data.floors.filter(function(f){
                    return f.id == $scope.data.floor;
                })[0];
                $scope.data.floorSelected = $scope.data.floors.filter(function(f){
                    return f.id == $scope.data.floor;
                })[0];
            });
        }
    });
});