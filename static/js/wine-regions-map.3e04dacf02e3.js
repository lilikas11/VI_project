(function() {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c)
                        return c(i, !0);
                    if (u)
                        return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw a.code = "MODULE_NOT_FOUND",
                    a
                }
                var p = n[i] = {
                    exports: {}
                };
                e[i][0].call(p.exports, function(r) {
                    var n = e[i][1][r];
                    return o(n || r)
                }, p, p.exports, r, e, n, t)
            }
            return n[i].exports
        }
        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)
            o(t[i]);
        return o
    }
    return r
}
)()({
    1: [function(require, module, exports) {
        "use strict";

        var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.AnimatedValue = void 0;

        var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

        var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

        var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

        var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));

        var _utils = require("../utils");

        var diff = function diff(num1, num2) {
            if (num1 > num2) {
                return num1 - num2;
            } else {
                return num2 - num1;
            }
        };

        var defaultConfig = {
            currentValue: 0,
            increment: 1,
            min: 0,
            max: 1,
            isIncrementByPercentage: false,
            onChangeCallback: function onChangeCallback() {}
        };

        var _onTransitionStartListeners = /*#__PURE__*/
        new WeakMap();

        var _onTransitionEndListeners = /*#__PURE__*/
        new WeakMap();

        var AnimatedValue = /*#__PURE__*/
        function() {
            function AnimatedValue() {
                var _this = this;

                var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultConfig
                  , currentValue = _ref.currentValue
                  , increment = _ref.increment
                  , isIncrementByPercentage = _ref.isIncrementByPercentage
                  , onChangeCallback = _ref.onChangeCallback
                  , min = _ref.min
                  , max = _ref.max;

                (0,
                _classCallCheck2.default)(this, AnimatedValue);

                _onTransitionStartListeners.set(this, {
                    writable: true,
                    value: (0,
                    _utils.createObserver)()
                });

                _onTransitionEndListeners.set(this, {
                    writable: true,
                    value: (0,
                    _utils.createObserver)()
                });

                (0,
                _defineProperty2.default)(this, "onFrame", function() {
                    var difference = Math.abs(_this.currentValue - _this.finalValue);

                    if (difference < _this.increment) {
                        _this.stopAnimation();
                    } else {
                        _this.currentValue = _this.calculateNextValue();

                        if (_this.currentValue === _this.max || _this.currentValue === _this.min) {
                            _this.finalValue = _this.currentValue;
                        }

                        _this.animationId = window.requestAnimationFrame(_this.onFrame);

                        _this.onChangeCallback(_this.currentValue);
                    }
                });
                (0,
                _defineProperty2.default)(this, "onTransitionStart", function(listener) {
                    return (0,
                    _classPrivateFieldGet2.default)(_this, _onTransitionStartListeners).subscribe(listener);
                });
                (0,
                _defineProperty2.default)(this, "onTransitionEnd", function(listener) {
                    return (0,
                    _classPrivateFieldGet2.default)(_this, _onTransitionEndListeners).subscribe(listener);
                });
                this.currentValue = currentValue;
                this.finalValue = currentValue;
                this.increment = increment;
                this.isIncrementByPercentage = isIncrementByPercentage;
                this.onChangeCallback = onChangeCallback;
                this.min = min;
                this.max = max;
                this.animationId = null;
                this.isRunning = false;
            }

            (0,
            _createClass2.default)(AnimatedValue, [{
                key: "init",
                value: function init() {
                    if (!this.isRunning) {
                        this.animationId = window.requestAnimationFrame(this.onFrame);
                        this.isRunning = true;
                        (0,
                        _classPrivateFieldGet2.default)(this, _onTransitionStartListeners).publish();
                    }
                }
            }, {
                key: "setCurrentValue",
                value: function setCurrentValue(value) {
                    this.currentValue = value;
                }
            }, {
                key: "setFinalValue",
                value: function setFinalValue(finalValue) {
                    var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
                    this.finalValue = finalValue;

                    if (animate) {
                        this.init();
                    } else {
                        this.currentValue = this.finalValue;
                        this.onChangeCallback(this.currentValue);
                    }
                }
            }, {
                key: "addToFinalValue",
                value: function addToFinalValue(value) {
                    this.setFinalValue(this.finalValue + value);
                }
            }, {
                key: "lerp",
                value: function lerp(a, b, n) {
                    return (1 - n) * a + n * b;
                }
            }, {
                key: "calculateNextValue",
                value: function calculateNextValue() {
                    var value;

                    if (this.isIncrementByPercentage) {
                        value = this.lerp(this.currentValue, this.finalValue, this.increment);
                    } else {
                        var difference = diff(this.currentValue, this.finalValue);
                        var isIncrement = difference > 0;

                        if (isIncrement) {
                            value = this.currentValue + this.increment;
                        } else {
                            value = this.currentValue - this.increment;
                        }
                    }

                    if (value >= this.max) {
                        value = this.max;
                    } else if (value <= this.min) {
                        value = this.min;
                    }

                    return value;
                }
            }, {
                key: "stopAnimation",
                value: function stopAnimation() {
                    if (this.animationId) {
                        window.cancelAnimationFrame(this.animationId);
                        this.isRunning = false;
                        (0,
                        _classPrivateFieldGet2.default)(this, _onTransitionEndListeners).publish();
                    }
                }
            }, {
                key: "setMin",
                value: function setMin(value) {
                    this.min = value;
                }
            }, {
                key: "setMax",
                value: function setMax(value) {
                    this.max = value;
                }
            }]);
            return AnimatedValue;
        }();

        exports.AnimatedValue = AnimatedValue;

    }
    , {
        "../utils": 6,
        "@babel/runtime/helpers/classCallCheck": 8,
        "@babel/runtime/helpers/classPrivateFieldGet": 10,
        "@babel/runtime/helpers/createClass": 11,
        "@babel/runtime/helpers/defineProperty": 12,
        "@babel/runtime/helpers/interopRequireDefault": 13
    }],
    2: [function(require, module, exports) {
        "use strict";

        var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.Slider = void 0;

        var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

        var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

        var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

        var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));

        var _animatedValue = require("../animated-value");

        var _utils = require("../../utils");

        function _classPrivateMethodGet(receiver, privateSet, fn) {
            if (!privateSet.has(receiver)) {
                throw new TypeError("attempted to get private field on non-instance");
            }
            return fn;
        }

        var BASE_SLIDER_CLASS = "slider";
        var BASE_SLIDER_LIST_CLASS = "".concat(BASE_SLIDER_CLASS, "__list");
        var LAZY_LOAD_IMAGE_CLASS = "".concat(BASE_SLIDER_CLASS, "-lazy");
        // const WINDOW_PERCENTAGE_ON_ITEM_TO_ACTIVE = 0.1;

        var _onIndexChangeListeners = /*#__PURE__*/
        new WeakMap();

        var _onSliderMovementListeners = /*#__PURE__*/
        new WeakMap();

        var _init = /*#__PURE__*/
        new WeakSet();

        var _watchResize = /*#__PURE__*/
        new WeakMap();

        var _watchWheel = /*#__PURE__*/
        new WeakMap();

        var _watchScroll = /*#__PURE__*/
        new WeakMap();

        var _watchLazyLoadImages = /*#__PURE__*/
        new WeakMap();

        var _calculateActiveIndex = /*#__PURE__*/
        new WeakMap();

        var _handleResizeChange = /*#__PURE__*/
        new WeakMap();

        var _handleAnimatedScrollChange = /*#__PURE__*/
        new WeakMap();

        var _onWindowChange = /*#__PURE__*/
        new WeakMap();

        var _disableWheel = /*#__PURE__*/
        new WeakSet();

        var _enableWheel = /*#__PURE__*/
        new WeakSet();

        var _getHorizontalScrollSize = /*#__PURE__*/
        new WeakMap();

        var _getVerticalScrollSize = /*#__PURE__*/
        new WeakMap();

        var _setDirection = /*#__PURE__*/
        new WeakMap();

        var _getScroll = /*#__PURE__*/
        new WeakMap();

        var _setScroll = /*#__PURE__*/
        new WeakMap();

        var _setIndex = /*#__PURE__*/
        new WeakMap();

        var _syncAnimatedScroll = /*#__PURE__*/
        new WeakMap();

        var Slider = /*#__PURE__*/
        function() {
            /**
   * Creates an instance of Slider.
   * @param {Object} config Slider configuration
   * @param {string} config.sliderClass HTML class refering to the element around the list of elements
   * @param {string} config.sliderListClass HTML class refering to the list element containing all the slider items
   * @param {string} config.sliderItemClass HTML class refering to a single slider item
   * @param {boolean} config.lazy When enabled all images with data-src and/or data-srcset using the class slider-lazy will be loaded as required
   * @memberof Slider
   */
            function Slider(_ref) {
                var _this = this;

                var sliderClass = _ref.sliderClass
                  , sliderListClass = _ref.sliderListClass
                  , sliderItemClass = _ref.sliderItemClass
                  , _ref$lazy = _ref.lazy
                  , lazy = _ref$lazy === void 0 ? false : _ref$lazy;
                (0,
                _classCallCheck2.default)(this, Slider);

                _enableWheel.add(this);

                _disableWheel.add(this);

                _init.add(this);

                _onIndexChangeListeners.set(this, {
                    writable: true,
                    value: (0,
                    _utils.createObserver)()
                });

                _onSliderMovementListeners.set(this, {
                    writable: true,
                    value: (0,
                    _utils.createObserver)()
                });

                _watchResize.set(this, {
                    writable: true,
                    value: function value() {
                        (0,
                        _classPrivateFieldGet2.default)(_this, _onWindowChange).call(_this);

                        if (window.ResizeObserver) {
                            _this.resizeObserver = new ResizeObserver((0,
                            _classPrivateFieldGet2.default)(_this, _handleResizeChange)).observe(_this.sliderListElement);
                        } else
                            window.addEventListener('resize', (0,
                            _classPrivateFieldGet2.default)(_this, _handleResizeChange));
                    }
                });

                _watchWheel.set(this, {
                    writable: true,
                    value: function value() {
                        _this.sliderListElement.addEventListener("wheel", function(e) {
                            if (_this.wheelEnabled) {
                                _this.animatedScroll.addToFinalValue(e.deltaY);
                            }
                        }, {
                            passive: true
                        });
                    }
                });

                _watchScroll.set(this, {
                    writable: true,
                    value: function value() {
                        _this.sliderListElement.addEventListener("scroll", function() {
                            if (!_this.isAnimatingScroll) {
                                (0,
                                _classPrivateFieldGet2.default)(_this, _syncAnimatedScroll).call(_this, (0,
                                _classPrivateFieldGet2.default)(_this, _getScroll).call(_this));
                            }

                            (0,
                            _classPrivateFieldGet2.default)(_this, _calculateActiveIndex).call(_this);
                        }, {
                            passive: true
                        });
                    }
                });

                _watchLazyLoadImages.set(this, {
                    writable: true,
                    value: function value() {
                        var lazyImages = document.querySelectorAll(".".concat(LAZY_LOAD_IMAGE_CLASS));
                        var imageObserver = new IntersectionObserver(function(entries) {
                            entries.forEach(function(entry) {
                                if (entry.isIntersecting) {
                                    var image = entry.target;

                                    if (image.hasAttribute("data-srcset")) {
                                        image.setAttribute("srcset", image.getAttribute("data-srcset"));
                                    }

                                    if (image.hasAttribute("data-src")) {
                                        image.setAttribute("src", image.getAttribute("data-src"));
                                    }

                                    imageObserver.unobserve(image);
                                }
                            });
                        }
                        ,{
                            rootMargin: "150px",
                            root: _this.sliderListElement
                        });
                        lazyImages.forEach(function(img) {
                            return imageObserver.observe(img);
                        });
                    }
                });

                _calculateActiveIndex.set(this, {
                    writable: true,
                    value: function value() {
                        _this.currentPosition = (0,
                        _classPrivateFieldGet2.default)(_this, _getScroll).call(_this);
                        var itemsLastIndex = _this.sliderItems.length - 1;
                        // const directionProp = this.isHorizontal ? "horizontal" : "vertical";
                        // const windowSize = this.isHorizontal
                        //   ? this.sliderListElement.clientWidth
                        //   : this.sliderListElement.clientHeight;
                        //Used to trigger as active as soon X percentage of the window contains the element
                        // const windowSizeToActive = windowSize * WINDOW_PERCENTAGE_ON_ITEM_TO_ACTIVE;

                        if (_this.prevPosition || _this.nextPosition) {
                            if ((!_this.prevPosition || _this.currentPosition >= _this.prevPosition) && (!_this.nextPosition || _this.currentPosition < _this.nextPosition))
                                return;
                        }

                        _this.sliderItems.forEach(function(el, index) {
                            var isLast = itemsLastIndex === index;
                            var nextIndex = isLast ? index : index + 1;
                            // const itemPosition =
                            //   this.itemsPosition[index][directionProp].start - windowSizeToActive;
                            // const nextItemPosition =
                            //   this.itemsPosition[nextIndex][directionProp].start - windowSizeToActive;

                            var margin = 100;
                            var itemBoundings = el.getBoundingClientRect();
                            var currentItemPosition = _this.currentPosition + (_this.isHorizontal ? itemBoundings.left : itemBoundings.top) - margin;
                            var nextItemBoundings = isLast ? null : _this.sliderItems[nextIndex].getBoundingClientRect();
                            var nextItemPosition = isLast ? null : _this.currentPosition + (_this.isHorizontal ? nextItemBoundings.left : nextItemBoundings.top) - margin;
                            var isActiveIndex = _this.currentPosition >= currentItemPosition && (isLast || _this.currentPosition < nextItemPosition);
                            // const isLowerThanScrollDistance = itemPosition <= currentScroll;
                            // const nextPositionIsLowerThanScrollDistance =
                            //   nextItemPosition <= currentScroll;
                            // const isActiveIndex =
                            //   isLowerThanScrollDistance &&
                            //   (!nextPositionIsLowerThanScrollDistance || isLast);

                            if (isActiveIndex) {
                                _this.prevPosition = index == 0 ? null : currentItemPosition;
                                _this.nextPosition = nextItemPosition;
                                (0,
                                _classPrivateFieldGet2.default)(_this, _setIndex).call(_this, index);
                            }
                        });
                    }
                });

                _handleResizeChange.set(this, {
                    writable: true,
                    value: (0,
                    _utils.debounce)(function() {
                        (0,
                        _classPrivateFieldGet2.default)(_this, _onWindowChange).call(_this);
                    }, 100)
                });

                _handleAnimatedScrollChange.set(this, {
                    writable: true,
                    value: function value(scrollValue) {
                        if (_this.wheelEnabled) {
                            (0,
                            _classPrivateFieldGet2.default)(_this, _setScroll).call(_this, scrollValue);
                        }
                    }
                });

                _onWindowChange.set(this, {
                    writable: true,
                    value: function value() {
                        if (window.innerWidth > _utils.SCREEN_TYPE.tablet_port && !_this.isHorizontal) {
                            _this.isHorizontal = true;
                            (0,
                            _classPrivateFieldGet2.default)(_this, _setDirection).call(_this, "horizontal");
                            (0,
                            _classPrivateFieldGet2.default)(_this, _syncAnimatedScroll).call(_this, 0);
                        }

                        if (window.innerWidth <= _utils.SCREEN_TYPE.tablet_port && _this.isHorizontal) {
                            _this.isHorizontal = false;
                            (0,
                            _classPrivateFieldGet2.default)(_this, _setDirection).call(_this, "vertical");
                            (0,
                            _classPrivateFieldGet2.default)(_this, _syncAnimatedScroll).call(_this, 0);
                        }

                        if (_this.isHorizontal) {
                            _this.animatedScroll.setMax((0,
                            _classPrivateFieldGet2.default)(_this, _getHorizontalScrollSize).call(_this));
                        } else {
                            _this.animatedScroll.setMax((0,
                            _classPrivateFieldGet2.default)(_this, _getVerticalScrollSize).call(_this));
                        }
                        // this.#calculateItemsPosition();

                    }
                });

                _getHorizontalScrollSize.set(this, {
                    writable: true,
                    value: function value() {
                        return _this.sliderListElement.scrollWidth - _this.sliderListElement.getBoundingClientRect().width;
                    }
                });

                _getVerticalScrollSize.set(this, {
                    writable: true,
                    value: function value() {
                        return _this.sliderListElement.scrollHeight;
                    }
                });

                _setDirection.set(this, {
                    writable: true,
                    value: function value() {
                        var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "horizontal";
                        _this.isHorizontal = direction === "horizontal";
                        var action = _this.isHorizontal ? "remove" : "add";

                        _this.sliderListElement.classList[action](_this.sliderListVerticalClass);
                    }
                });

                _getScroll.set(this, {
                    writable: true,
                    value: function value() {
                        var scrollPosition = _this.isHorizontal ? "scrollLeft" : "scrollTop";
                        return _this.sliderListElement[scrollPosition];
                    }
                });

                _setScroll.set(this, {
                    writable: true,
                    value: function value(scrollValue) {
                        var scrollPosition = _this.isHorizontal ? "scrollLeft" : "scrollTop";
                        _this.sliderListElement[scrollPosition] = scrollValue;
                        (0,
                        _classPrivateFieldGet2.default)(_this, _onSliderMovementListeners).publish();
                    }
                });

                _setIndex.set(this, {
                    writable: true,
                    value: function value(index) {
                        if (index !== _this.activeIndex) {
                            _this.activeIndex = index;
                            (0,
                            _classPrivateFieldGet2.default)(_this, _onIndexChangeListeners).publish(index);
                        }
                    }
                });

                _syncAnimatedScroll.set(this, {
                    writable: true,
                    value: function value(_value) {
                        _this.animatedScroll.setFinalValue(_value, false);
                    }
                });

                (0,
                _defineProperty2.default)(this, "onIndexChange", function(listener) {
                    return (0,
                    _classPrivateFieldGet2.default)(_this, _onIndexChangeListeners).subscribe(listener);
                });
                (0,
                _defineProperty2.default)(this, "onSliderMovement", function(listener) {
                    return (0,
                    _classPrivateFieldGet2.default)(_this, _onSliderMovementListeners).subscribe(listener);
                });
                this.sliderClass = sliderClass;
                this.sliderListClass = sliderListClass;
                this.sliderItemClass = sliderItemClass;
                this.sliderListVerticalClass = "".concat(BASE_SLIDER_LIST_CLASS, "--vertical");
                this.sliderListElement = document.querySelector(".".concat(this.sliderListClass));
                this.sliderItems = Array.from(document.querySelectorAll(".".concat(this.sliderItemClass)));
                this.isLazyMode = lazy;
                this.wheelEnabled = true;
                this.isHorizontal = true;
                this.isAnimatingScroll = false;
                this.activeIndex = 0;

                _classPrivateMethodGet(this, _init, _init2).call(this);
            }

            (0,
            _createClass2.default)(Slider, [{
                key: "goToIndex",
                value: function goToIndex(index) {
                    if (index !== this.activeIndex) {
                        var direction = this.isHorizontal ? "left" : "top";
                        this.animatedScroll.setFinalValue(this.sliderItems[index].getBoundingClientRect()[direction] + (0,
                        _classPrivateFieldGet2.default)(this, _getScroll).call(this)// this.itemsPosition[index][direction].start
                        );
                        (0,
                        _classPrivateFieldGet2.default)(this, _setIndex).call(this, index);
                    }
                }
            }]);
            return Slider;
        }();

        exports.Slider = Slider;

        function _init2() {
            var _this2 = this;

            this.animatedScroll = new _animatedValue.AnimatedValue({
                currentValue: 0,
                isIncrementByPercentage: true,
                increment: 0.1,
                max: this.isHorizontal ? (0,
                _classPrivateFieldGet2.default)(this, _getHorizontalScrollSize).call(this) : (0,
                _classPrivateFieldGet2.default)(this, _getVerticalScrollSize).call(this),
                min: 0,
                onChangeCallback: (0,
                _classPrivateFieldGet2.default)(this, _handleAnimatedScrollChange)
            });
            this.animatedScroll.onTransitionStart(function() {
                _this2.isAnimatingScroll = true;
            });
            this.animatedScroll.onTransitionEnd(function() {
                _this2.isAnimatingScroll = false;
            });
            (0,
            _classPrivateFieldGet2.default)(this, _watchResize).call(this);
            (0,
            _classPrivateFieldGet2.default)(this, _watchWheel).call(this);
            (0,
            _classPrivateFieldGet2.default)(this, _watchScroll).call(this);

            if (this.isLazyMode) {
                (0,
                _classPrivateFieldGet2.default)(this, _watchLazyLoadImages).call(this);
            }
        }

        function _disableWheel2() {
            if (this.wheelEnabled) {
                this.animatedScroll.stopAnimation();
                this.wheelEnabled = false;
            }
        }

        function _enableWheel2() {
            if (!this.wheelEnabled) {
                var scrollValue = (0,
                _classPrivateFieldGet2.default)(this, _getScroll).call(this);
                (0,
                _classPrivateFieldGet2.default)(this, _syncAnimatedScroll).call(this, scrollValue);
                this.wheelEnabled = true;
            }
        }

    }
    , {
        "../../utils": 6,
        "../animated-value": 1,
        "@babel/runtime/helpers/classCallCheck": 8,
        "@babel/runtime/helpers/classPrivateFieldGet": 10,
        "@babel/runtime/helpers/createClass": 11,
        "@babel/runtime/helpers/defineProperty": 12,
        "@babel/runtime/helpers/interopRequireDefault": 13
    }],
    3: [function(require, module, exports) {
        "use strict";

        var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.RegionSelector = void 0;

        var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

        var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

        var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

        var RegionSelector = /*#__PURE__*/
        function() {
            function RegionSelector() {
                var _this = this;

                (0,
                _classCallCheck2.default)(this, RegionSelector);
                (0,
                _defineProperty2.default)(this, "bindOnItemClick", function(callback) {
                    _this.onItemClick = callback;

                    if (!_this.isWatchingClick) {
                        _this.isWatchingClick = true;

                        _this.watchMapClick();

                        _this.watchIslandsClick();
                    }
                });
                this.regionIdAttribute = "data-region-id";
                //map

                this.element = document.getElementById("regions");
                this.regions = Array.from(this.element.querySelectorAll("[".concat(this.regionIdAttribute, "]")));
                //islands

                this.islands = document.querySelector(".region__home__islands");
                this.isWatchingClick = false;
                var isHorizontal = null;
                var mobileViewBox = '320 70 400 1000';
                var initialViewBox = this.element.getAttribute('viewBox');
                var dimension = 768;

                var onResize = function onResize() {
                    if (window.innerWidth > dimension && isHorizontal != true) {
                        isHorizontal = true;

                        _this.element.setAttribute('viewBox', initialViewBox);
                    } else if (window.innerWidth <= dimension && isHorizontal != false) {
                        isHorizontal = false;

                        _this.element.setAttribute('viewBox', mobileViewBox);
                    }
                };

                window.addEventListener('resize', onResize);
                onResize();
            }

            (0,
            _createClass2.default)(RegionSelector, [{
                key: "watchMapClick",
                value: function watchMapClick() {
                    var _this2 = this;

                    this.element.addEventListener("click", function(e) {
                        var targetElement = e.target;
                        var regionIdAttribute = targetElement.getAttribute(_this2.regionIdAttribute);

                        if (regionIdAttribute) {
                            _this2.onItemClick(parseInt(regionIdAttribute));
                        }
                    }, {
                        passive: true
                    });
                }
            }, {
                key: "watchIslandsClick",
                value: function watchIslandsClick() {
                    var _this3 = this;

                    this.islands.addEventListener("click", function(e) {
                        var targetElement = e.target.closest(".region__home__island");
                        var regionIdAttribute = targetElement.getAttribute(_this3.regionIdAttribute);

                        if (regionIdAttribute) {
                            _this3.onItemClick(parseInt(regionIdAttribute));
                        }
                    }, {
                        passive: true
                    });
                }
            }]);
            return RegionSelector;
        }();

        exports.RegionSelector = RegionSelector;

    }
    , {
        "@babel/runtime/helpers/classCallCheck": 8,
        "@babel/runtime/helpers/createClass": 11,
        "@babel/runtime/helpers/defineProperty": 12,
        "@babel/runtime/helpers/interopRequireDefault": 13
    }],
    4: [function(require, module, exports) {
        "use strict";

        var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.RegionSlider = void 0;

        var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

        var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

        var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

        var _slider = require("../../components/slider");

        var _utils = require("../../utils");

        var RegionSlider = /*#__PURE__*/
        function() {
            function RegionSlider() {
                var _this = this;

                (0,
                _classCallCheck2.default)(this, RegionSlider);
                (0,
                _defineProperty2.default)(this, "goToRegion", function(regionId) {
                    var sliderIndex = _this.slidersByRegion[regionId];

                    if (sliderIndex !== undefined) {
                        _this.slider.goToIndex(sliderIndex);
                    }
                });
                (0,
                _defineProperty2.default)(this, "watchFirstSlideVisibility", function() {
                    var intersectionHandler = function intersectionHandler(entries) {
                        entries.forEach(function(entry) {
                            if (entry.isIntersecting) {
                                _this.toggleGoBackButtonVisiblity(false);

                                _this.toggleOrbVisiblity(false);
                            } else {
                                _this.toggleGoBackButtonVisiblity(true);

                                _this.toggleOrbVisiblity(true);
                            }
                        });
                    };

                    var observer = new IntersectionObserver(intersectionHandler);
                    observer.observe(_this.homeSlider);
                });
                (0,
                _defineProperty2.default)(this, "handleSlideChange", function(activeIndex) {
                    if (activeIndex >= 1) {
                        var sliderRegionId = _this.getSliderItemRegionId(_this.sliders[activeIndex]);

                        if (sliderRegionId) {
                            _this.setBackButtonRegionMap(sliderRegionId);
                        }
                    }
                });
                (0,
                _defineProperty2.default)(this, "toggleGoBackButtonVisiblity", function(show) {
                    if (!_this.goBackButtonIsVisible && show) {
                        _this.goBackButtonIsVisible = true;

                        _this.goBackButton.classList.add(_this.goBackButtonVisibleClass);
                    } else if (_this.goBackButtonIsVisible && !show) {
                        _this.goBackButtonIsVisible = false;

                        _this.goBackButton.classList.remove(_this.goBackButtonVisibleClass);
                    }
                });
                (0,
                _defineProperty2.default)(this, "toggleOrbVisiblity", function(show) {
                    if (!_this.orbIsVisible && show) {
                        _this.orbIsVisible = true;

                        _this.orb.classList.add(_this.orbVisibleClass);
                    } else if (_this.orbIsVisible && !show) {
                        _this.orbIsVisible = false;

                        _this.orb.classList.remove(_this.orbVisibleClass);
                    }
                });
                (0,
                _defineProperty2.default)(this, "getSliderItemRegionId", function(item) {
                    return item.getAttribute("data-region-id");
                });
                (0,
                _defineProperty2.default)(this, "setBackButtonRegionMap", function(regionId) {
                    var regionSvgName = _utils.regionIdToSvgName[parseInt(regionId)];

                    var svgPath = _this.goBackButtonIcon.getAttribute("xlink:href");

                    var updatedSvgPath = svgPath.replace(/(.*\#icon-)(.*)/, "$1".concat(regionSvgName));

                    _this.goBackButtonIcon.setAttribute("xlink:href", updatedSvgPath);
                });
                this.homeSlider = document.querySelector(".region__home");
                this.goBackButton = document.querySelector(".region__slider__button");
                this.goBackButtonIcon = this.goBackButton.querySelector("use");
                this.goBackButtonVisibleClass = "region__slider__button--visible";
                this.orb = document.querySelector(".region__slider__orb");
                this.orbVisibleClass = "region__slider__orb--visible";
                this.goBackButtonIsVisible = false;
                this.orbIsVisible = false;
                this.init();
            }

            (0,
            _createClass2.default)(RegionSlider, [{
                key: "init",
                value: function init() {
                    this.slider = new _slider.Slider({
                        sliderClass: "region__slider",
                        sliderListClass: "region__slider__list",
                        sliderItemClass: "region__slider__item",
                        lazy: true
                    });
                    this.slider.onIndexChange(this.handleSlideChange);
                    this.watchFirstSlideVisibility();
                    this.watchGoBackClick();
                    this.sliders = Array.from(document.querySelectorAll(".region__slider__item"));
                    this.slidersByRegion = this.sliders.reduce(function(acc, item, index) {
                        var regionId = item.getAttribute("data-region-id");

                        if (regionId) {
                            acc[regionId] = index;
                        }

                        return acc;
                    }, {});
                }
            }, {
                key: "watchGoBackClick",
                value: function watchGoBackClick() {
                    var _this2 = this;

                    this.goBackButton.addEventListener("click", function() {
                        _this2.slider.goToIndex(0);
                    }, {
                        passive: true
                    });
                }
            }]);
            return RegionSlider;
        }();

        exports.RegionSlider = RegionSlider;

    }
    , {
        "../../components/slider": 2,
        "../../utils": 6,
        "@babel/runtime/helpers/classCallCheck": 8,
        "@babel/runtime/helpers/createClass": 11,
        "@babel/runtime/helpers/defineProperty": 12,
        "@babel/runtime/helpers/interopRequireDefault": 13
    }],
    5: [function(require, module, exports) {
        "use strict";

        var _slider = require("./slider");

        var _regionSelector = require("./region-selector");

        $(function() {
            var slider = new _slider.RegionSlider();
            var regionSelector = new _regionSelector.RegionSelector();
            regionSelector.bindOnItemClick(function(regionId) {
                slider.goToRegion(regionId);
            });
        });

    }
    , {
        "./region-selector": 3,
        "./slider": 4
    }],
    6: [function(require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.fadeOut = fadeOut;
        exports.fadeIn = fadeIn;
        exports.regionIdToSvgName = exports.createObserver = exports.SCREEN_TYPE = exports.getQueryString = exports.formatDate = exports.findRangeIndex = exports.getElementSeenPercentage = exports.interpolateFromRange = exports.throttle = exports.debounce = void 0;

        var debounce = function debounce(func) {
            var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var timeoutId;
            return function debounced() {
                var context = this;
                var args = arguments;

                if (timeoutId) {
                    clearTimeout(timeoutId);
                }

                timeoutId = setTimeout(function() {
                    func.apply(context, args);
                }, delay);
            }
            ;
        };

        exports.debounce = debounce;

        var throttle = function throttle(func) {
            var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var wait = false;
            return function() {
                var context = this;
                var args = arguments;

                if (!wait) {
                    wait = true;
                    func.apply(context, args);
                    setTimeout(function() {
                        wait = false;
                    }, time);
                }
            }
            ;
        };
        // adapted from https://gist.github.com/alirezas/c4f9f43e9fe1abba9a4824dd6fc60a55

        exports.throttle = throttle;

        function fadeOut(el) {
            el.style.opacity = 1;
            var canceled = false;

            (function fade() {
                if (canceled) {
                    return;
                }

                if ((el.style.opacity -= 0.1) < 0) {
                    el.style.display = "none";
                } else {
                    requestAnimationFrame(fade);
                }
            }
            )();

            return {
                cancel: function cancel() {
                    canceled = true;
                }
            };
        }

        function fadeIn(el, display) {
            el.style.opacity = 0;
            el.style.display = display || "block";
            var canceled = false;

            (function fade() {
                if (canceled) {
                    return;
                }

                var val = parseFloat(el.style.opacity);

                if (!((val += 0.1) > 1)) {
                    el.style.opacity = val;
                    requestAnimationFrame(fade);
                }
            }
            )();

            return {
                cancel: function cancel() {
                    canceled = true;
                }
            };
        }
        /**
 *
 *
 * @param {number} value
 * @param {number} inputMin
 * @param {number} inputMax
 * @param {number} outputMin
 * @param {number} outputMax
 * @param {boolean} [clamp=false]
 * @return {*}
 */

        var interpolate = function interpolate(value, inputMin, inputMax, outputMin, outputMax) {
            var clamp = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
            var result = value;
            // Extrapolate

            if (result < inputMin) {
                if (clamp) {
                    result = inputMin;
                }
            }

            if (result > inputMax) {
                if (clamp) {
                    result = inputMax;
                }
            }

            if (outputMin === outputMax) {
                return outputMin;
            }

            if (inputMin === inputMax) {
                if (value <= inputMin) {
                    return outputMin;
                }

                return outputMax;
            }

            return outputMin + (outputMax - outputMin) * (result - inputMin) / (inputMax - inputMin);
        };
        /**
 *
 *
 * @param {number} value
 * @param {number[]} inputRange
 * @param {number[]} outputRange
 * @param {boolean} [clamp=false]
 * @return {*}
 */

        var interpolateFromRange = function interpolateFromRange(value, inputRange, outputRange) {
            var clamp = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            var rangeIndex = findRangeIndex(value, inputRange);
            return interpolate(value, inputRange[rangeIndex], inputRange[rangeIndex + 1], outputRange[rangeIndex], outputRange[rangeIndex + 1], clamp);
        };

        exports.interpolateFromRange = interpolateFromRange;

        var getElementSeenPercentage = function getElementSeenPercentage(element) {
            var isVertical = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var rect = element.getBoundingClientRect();

            if (isVertical) {
                return interpolate(rect.top, -rect.height, window.innerHeight, 100, 0, true);
            } else {
                return interpolate(rect.left, -rect.width, window.innerWidth, 100, 0, true);
            }
        };

        exports.getElementSeenPercentage = getElementSeenPercentage;

        var findRangeIndex = function findRangeIndex(value, ranges) {
            var index;

            for (index = 1; index < ranges.length - 1; index++) {
                if (ranges[index] >= value) {
                    break;
                }
            }

            return index - 1;
        };

        exports.findRangeIndex = findRangeIndex;

        var fixHours = function fixHours(hours) {
            return hours < 10 ? "0" + hours : hours;
        };

        var formatDate = function formatDate(date, format) {
            if (!date || !format)
                return "";
            var d = new Date(date);
            var day = d.getDate();
            var month = d.getMonth() + 1;
            var monthName = monthNames[month - 1];
            var year = d.getFullYear();
            var minYear = year.toString().substring(2, 4);
            var hours = fixHours(d.getHours());
            var minutes = fixHours(d.getMinutes());
            var seconds = fixHours(d.getSeconds());
            return format.replaceAll("dd", day).replaceAll("MMMM", monthName).replaceAll("MM", month).replaceAll("yyyy", year).replaceAll("yy", minYear).replaceAll("hh", hours).replaceAll("mm", minutes).replaceAll("ss", seconds);
        };

        exports.formatDate = formatDate;

        var getQueryString = function getQueryString(key) {
            var matches = window.location.search.match("".concat(key, "=([\\S]+)(?:&|$)"));
            if (matches && matches.length >= 2)
                return matches[1];
            return null;
        };

        exports.getQueryString = getQueryString;
        var SCREEN_TYPE = {
            mobile: 600,
            tablet_port: 996.8,
            tablet_land: 1200,
            desktop: 9999
        };
        /**
 * @param  {(listener)=>{listeners.push(listener} =>{letlisteners=[];return{subscribe
 */

        exports.SCREEN_TYPE = SCREEN_TYPE;

        var createObserver = function createObserver() {
            var listeners = [];
            return {
                subscribe: function subscribe(listener) {
                    listeners.push(listener);
                    return function() {
                        listeners = listeners.filter(function(l) {
                            return l !== listener;
                        });
                    }
                    ;
                },
                publish: function publish(event) {
                    listeners.forEach(function(l) {
                        return l(event);
                    });
                }
            };
        };

        exports.createObserver = createObserver;
        var regionIdToSvgName = {
            1: "vinho-verde",
            2: "tras-os-montes",
            3: "porto-e-douro",
            4: "tavora-e-varosa",
            5: "dao",
            6: "bairrada",
            7: "beira-interior",
            8: "lisboa",
            9: "tejo",
            10: "setubal",
            11: "alentejo",
            12: "algarve",
            13: "madeira",
            14: "acores"
        };
        exports.regionIdToSvgName = regionIdToSvgName;

    }
    , {}],
    7: [function(require, module, exports) {
        function _classApplyDescriptorGet(receiver, descriptor) {
            if (descriptor.get) {
                return descriptor.get.call(receiver);
            }

            return descriptor.value;
        }

        module.exports = _classApplyDescriptorGet;
        module.exports["default"] = module.exports,
        module.exports.__esModule = true;
    }
    , {}],
    8: [function(require, module, exports) {
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        module.exports = _classCallCheck;
        module.exports["default"] = module.exports,
        module.exports.__esModule = true;
    }
    , {}],
    9: [function(require, module, exports) {
        function _classExtractFieldDescriptor(receiver, privateMap, action) {
            if (!privateMap.has(receiver)) {
                throw new TypeError("attempted to " + action + " private field on non-instance");
            }

            return privateMap.get(receiver);
        }

        module.exports = _classExtractFieldDescriptor;
        module.exports["default"] = module.exports,
        module.exports.__esModule = true;
    }
    , {}],
    10: [function(require, module, exports) {
        var classApplyDescriptorGet = require("./classApplyDescriptorGet.js");

        var classExtractFieldDescriptor = require("./classExtractFieldDescriptor.js");

        function _classPrivateFieldGet(receiver, privateMap) {
            var descriptor = classExtractFieldDescriptor(receiver, privateMap, "get");
            return classApplyDescriptorGet(receiver, descriptor);
        }

        module.exports = _classPrivateFieldGet;
        module.exports["default"] = module.exports,
        module.exports.__esModule = true;
    }
    , {
        "./classApplyDescriptorGet.js": 7,
        "./classExtractFieldDescriptor.js": 9
    }],
    11: [function(require, module, exports) {
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value"in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps)
                _defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                _defineProperties(Constructor, staticProps);
            return Constructor;
        }

        module.exports = _createClass;
        module.exports["default"] = module.exports,
        module.exports.__esModule = true;
    }
    , {}],
    12: [function(require, module, exports) {
        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }

            return obj;
        }

        module.exports = _defineProperty;
        module.exports["default"] = module.exports,
        module.exports.__esModule = true;
    }
    , {}],
    13: [function(require, module, exports) {
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }

        module.exports = _interopRequireDefault;
        module.exports["default"] = module.exports,
        module.exports.__esModule = true;
    }
    , {}]
}, {}, [5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvY29tcG9uZW50cy9hbmltYXRlZC12YWx1ZS5qcyIsImFzc2V0cy9qcy9jb21wb25lbnRzL3NsaWRlci9pbmRleC5qcyIsImFzc2V0cy9qcy9wYWdlcy93aW5lLXJlZ2lvbnMtbWFwL3JlZ2lvbi1zZWxlY3Rvci5qcyIsImFzc2V0cy9qcy9wYWdlcy93aW5lLXJlZ2lvbnMtbWFwL3NsaWRlci5qcyIsImFzc2V0cy9qcy9wYWdlcy93aW5lLXJlZ2lvbnMtbWFwL3dpbmUtcmVnaW9ucy1tYXAuanMiLCJhc3NldHMvanMvdXRpbHMuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0FwcGx5RGVzY3JpcHRvckdldC5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NFeHRyYWN0RmllbGREZXNjcmlwdG9yLmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NQcml2YXRlRmllbGRHZXQuanMiLCJub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIm5vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7QUFFQSxJQUFNLElBQUksR0FBRyxTQUFQLElBQU8sQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFnQjtBQUMzQixNQUFJLElBQUksR0FBRyxJQUFYLEVBQWlCO0FBQ2YsV0FBTyxJQUFJLEdB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB7IGNyZWF0ZU9ic2VydmVyIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5cbmNvbnN0IGRpZmYgPSAobnVtMSwgbnVtMikgPT4ge1xuICBpZiAobnVtMSA+IG51bTIpIHtcbiAgICByZXR1cm4gbnVtMSAtIG51bTI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bTIgLSBudW0xO1xuICB9XG59O1xuXG5jb25zdCBkZWZhdWx0Q29uZmlnID0ge1xuICBjdXJyZW50VmFsdWU6IDAsXG4gIGluY3JlbWVudDogMSxcbiAgbWluOiAwLFxuICBtYXg6IDEsXG4gIGlzSW5jcmVtZW50QnlQZXJjZW50YWdlOiBmYWxzZSxcbiAgb25DaGFuZ2VDYWxsYmFjazogKCkgPT4ge30sXG59O1xuXG5leHBvcnQgY2xhc3MgQW5pbWF0ZWRWYWx1ZSB7XG4gICNvblRyYW5zaXRpb25TdGFydExpc3RlbmVycyA9IGNyZWF0ZU9ic2VydmVyKCk7XG4gICNvblRyYW5zaXRpb25FbmRMaXN0ZW5lcnMgPSBjcmVhdGVPYnNlcnZlcigpO1xuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBjdXJyZW50VmFsdWUsXG4gICAgaW5jcmVtZW50LFxuICAgIGlzSW5jcmVtZW50QnlQZXJjZW50YWdlLFxuICAgIG9uQ2hhbmdlQ2FsbGJhY2ssXG4gICAgbWluLFxuICAgIG1heCxcbiAgfSA9IGRlZmF1bHRDb25maWcpIHtcbiAgICB0aGlzLmN1cnJlbnRWYWx1ZSA9IGN1cnJlbnRWYWx1ZTtcbiAgICB0aGlzLmZpbmFsVmFsdWUgPSBjdXJyZW50VmFsdWU7XG4gICAgdGhpcy5pbmNyZW1lbnQgPSBpbmNyZW1lbnQ7XG4gICAgdGhpcy5pc0luY3JlbWVudEJ5UGVyY2VudGFnZSA9IGlzSW5jcmVtZW50QnlQZXJjZW50YWdlO1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IG9uQ2hhbmdlQ2FsbGJhY2s7XG4gICAgdGhpcy5taW4gPSBtaW47XG4gICAgdGhpcy5tYXggPSBtYXg7XG5cbiAgICB0aGlzLmFuaW1hdGlvbklkID0gbnVsbDtcbiAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuaXNSdW5uaW5nKSB7XG4gICAgICB0aGlzLmFuaW1hdGlvbklkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLm9uRnJhbWUpO1xuICAgICAgdGhpcy5pc1J1bm5pbmcgPSB0cnVlO1xuXG4gICAgICB0aGlzLiNvblRyYW5zaXRpb25TdGFydExpc3RlbmVycy5wdWJsaXNoKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0Q3VycmVudFZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5jdXJyZW50VmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHNldEZpbmFsVmFsdWUoZmluYWxWYWx1ZSwgYW5pbWF0ZSA9IHRydWUpIHtcbiAgICB0aGlzLmZpbmFsVmFsdWUgPSBmaW5hbFZhbHVlO1xuXG4gICAgaWYgKGFuaW1hdGUpIHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRWYWx1ZSA9IHRoaXMuZmluYWxWYWx1ZTtcblxuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuY3VycmVudFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBhZGRUb0ZpbmFsVmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLnNldEZpbmFsVmFsdWUodGhpcy5maW5hbFZhbHVlICsgdmFsdWUpO1xuICB9XG5cbiAgbGVycChhLCBiLCBuKSB7XG4gICAgcmV0dXJuICgxIC0gbikgKiBhICsgbiAqIGI7XG4gIH1cblxuICBjYWxjdWxhdGVOZXh0VmFsdWUoKSB7XG4gICAgbGV0IHZhbHVlO1xuXG4gICAgaWYgKHRoaXMuaXNJbmNyZW1lbnRCeVBlcmNlbnRhZ2UpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5sZXJwKHRoaXMuY3VycmVudFZhbHVlLCB0aGlzLmZpbmFsVmFsdWUsIHRoaXMuaW5jcmVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IGRpZmYodGhpcy5jdXJyZW50VmFsdWUsIHRoaXMuZmluYWxWYWx1ZSk7XG4gICAgICBjb25zdCBpc0luY3JlbWVudCA9IGRpZmZlcmVuY2UgPiAwO1xuXG4gICAgICBpZiAoaXNJbmNyZW1lbnQpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmN1cnJlbnRWYWx1ZSArIHRoaXMuaW5jcmVtZW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmN1cnJlbnRWYWx1ZSAtIHRoaXMuaW5jcmVtZW50O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh2YWx1ZSA+PSB0aGlzLm1heCkge1xuICAgICAgdmFsdWUgPSB0aGlzLm1heDtcbiAgICB9IGVsc2UgaWYgKHZhbHVlIDw9IHRoaXMubWluKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMubWluO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIG9uRnJhbWUgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IE1hdGguYWJzKHRoaXMuY3VycmVudFZhbHVlIC0gdGhpcy5maW5hbFZhbHVlKTtcblxuICAgIGlmIChkaWZmZXJlbmNlIDwgdGhpcy5pbmNyZW1lbnQpIHtcbiAgICAgIHRoaXMuc3RvcEFuaW1hdGlvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRWYWx1ZSA9IHRoaXMuY2FsY3VsYXRlTmV4dFZhbHVlKCk7XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRWYWx1ZSA9PT0gdGhpcy5tYXggfHwgdGhpcy5jdXJyZW50VmFsdWUgPT09IHRoaXMubWluKSB7XG4gICAgICAgIHRoaXMuZmluYWxWYWx1ZSA9IHRoaXMuY3VycmVudFZhbHVlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFuaW1hdGlvbklkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLm9uRnJhbWUpO1xuXG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgfTtcblxuICBzdG9wQW5pbWF0aW9uKCkge1xuICAgIGlmICh0aGlzLmFuaW1hdGlvbklkKSB7XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25JZCk7XG4gICAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xuXG4gICAgICB0aGlzLiNvblRyYW5zaXRpb25FbmRMaXN0ZW5lcnMucHVibGlzaCgpO1xuICAgIH1cbiAgfVxuXG4gIHNldE1pbih2YWx1ZSkge1xuICAgIHRoaXMubWluID0gdmFsdWU7XG4gIH1cblxuICBzZXRNYXgodmFsdWUpIHtcbiAgICB0aGlzLm1heCA9IHZhbHVlO1xuICB9XG5cbiAgb25UcmFuc2l0aW9uU3RhcnQgPSAobGlzdGVuZXIpID0+IHtcbiAgICByZXR1cm4gdGhpcy4jb25UcmFuc2l0aW9uU3RhcnRMaXN0ZW5lcnMuc3Vic2NyaWJlKGxpc3RlbmVyKTtcbiAgfTtcblxuICBvblRyYW5zaXRpb25FbmQgPSAobGlzdGVuZXIpID0+IHtcbiAgICByZXR1cm4gdGhpcy4jb25UcmFuc2l0aW9uRW5kTGlzdGVuZXJzLnN1YnNjcmliZShsaXN0ZW5lcik7XG4gIH07XG59XG4iLCJpbXBvcnQgeyBBbmltYXRlZFZhbHVlIH0gZnJvbSBcIi4uL2FuaW1hdGVkLXZhbHVlXCI7XG5pbXBvcnQgeyBkZWJvdW5jZSwgU0NSRUVOX1RZUEUgfSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcbmltcG9ydCB7IGNyZWF0ZU9ic2VydmVyIH0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XG5cbmNvbnN0IEJBU0VfU0xJREVSX0NMQVNTID0gXCJzbGlkZXJcIjtcbmNvbnN0IEJBU0VfU0xJREVSX0xJU1RfQ0xBU1MgPSBgJHtCQVNFX1NMSURFUl9DTEFTU31fX2xpc3RgO1xuY29uc3QgTEFaWV9MT0FEX0lNQUdFX0NMQVNTID0gYCR7QkFTRV9TTElERVJfQ0xBU1N9LWxhenlgO1xuLy8gY29uc3QgV0lORE9XX1BFUkNFTlRBR0VfT05fSVRFTV9UT19BQ1RJVkUgPSAwLjE7XG5cbmV4cG9ydCBjbGFzcyBTbGlkZXIge1xuICAjb25JbmRleENoYW5nZUxpc3RlbmVycyA9IGNyZWF0ZU9ic2VydmVyKCk7XG4gICNvblNsaWRlck1vdmVtZW50TGlzdGVuZXJzID0gY3JlYXRlT2JzZXJ2ZXIoKTtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgU2xpZGVyLlxuICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFNsaWRlciBjb25maWd1cmF0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb25maWcuc2xpZGVyQ2xhc3MgSFRNTCBjbGFzcyByZWZlcmluZyB0byB0aGUgZWxlbWVudCBhcm91bmQgdGhlIGxpc3Qgb2YgZWxlbWVudHNcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbmZpZy5zbGlkZXJMaXN0Q2xhc3MgSFRNTCBjbGFzcyByZWZlcmluZyB0byB0aGUgbGlzdCBlbGVtZW50IGNvbnRhaW5pbmcgYWxsIHRoZSBzbGlkZXIgaXRlbXNcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbmZpZy5zbGlkZXJJdGVtQ2xhc3MgSFRNTCBjbGFzcyByZWZlcmluZyB0byBhIHNpbmdsZSBzbGlkZXIgaXRlbVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNvbmZpZy5sYXp5IFdoZW4gZW5hYmxlZCBhbGwgaW1hZ2VzIHdpdGggZGF0YS1zcmMgYW5kL29yIGRhdGEtc3Jjc2V0IHVzaW5nIHRoZSBjbGFzcyBzbGlkZXItbGF6eSB3aWxsIGJlIGxvYWRlZCBhcyByZXF1aXJlZFxuICAgKiBAbWVtYmVyb2YgU2xpZGVyXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih7IHNsaWRlckNsYXNzLCBzbGlkZXJMaXN0Q2xhc3MsIHNsaWRlckl0ZW1DbGFzcywgbGF6eSA9IGZhbHNlIH0pIHtcbiAgICB0aGlzLnNsaWRlckNsYXNzID0gc2xpZGVyQ2xhc3M7XG4gICAgdGhpcy5zbGlkZXJMaXN0Q2xhc3MgPSBzbGlkZXJMaXN0Q2xhc3M7XG4gICAgdGhpcy5zbGlkZXJJdGVtQ2xhc3MgPSBzbGlkZXJJdGVtQ2xhc3M7XG4gICAgdGhpcy5zbGlkZXJMaXN0VmVydGljYWxDbGFzcyA9IGAke0JBU0VfU0xJREVSX0xJU1RfQ0xBU1N9LS12ZXJ0aWNhbGA7XG5cbiAgICB0aGlzLnNsaWRlckxpc3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dGhpcy5zbGlkZXJMaXN0Q2xhc3N9YCk7XG4gICAgdGhpcy5zbGlkZXJJdGVtcyA9IEFycmF5LmZyb20oXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHt0aGlzLnNsaWRlckl0ZW1DbGFzc31gKVxuICAgICk7XG5cbiAgICB0aGlzLmlzTGF6eU1vZGUgPSBsYXp5O1xuICAgIHRoaXMud2hlZWxFbmFibGVkID0gdHJ1ZTtcbiAgICB0aGlzLmlzSG9yaXpvbnRhbCA9IHRydWU7XG4gICAgdGhpcy5pc0FuaW1hdGluZ1Njcm9sbCA9IGZhbHNlO1xuICAgIHRoaXMuYWN0aXZlSW5kZXggPSAwO1xuXG4gICAgdGhpcy4jaW5pdCgpO1xuICB9XG5cbiAgZ29Ub0luZGV4KGluZGV4KSB7XG4gICAgaWYgKGluZGV4ICE9PSB0aGlzLmFjdGl2ZUluZGV4KSB7XG4gICAgICBjb25zdCBkaXJlY3Rpb24gPSB0aGlzLmlzSG9yaXpvbnRhbCA/IFwibGVmdFwiIDogXCJ0b3BcIjtcbiAgICAgIFxuICAgICAgdGhpcy5hbmltYXRlZFNjcm9sbC5zZXRGaW5hbFZhbHVlKFxuICAgICAgICB0aGlzLnNsaWRlckl0ZW1zW2luZGV4XS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVtkaXJlY3Rpb25dICsgdGhpcy4jZ2V0U2Nyb2xsKClcbiAgICAgICAgLy8gdGhpcy5pdGVtc1Bvc2l0aW9uW2luZGV4XVtkaXJlY3Rpb25dLnN0YXJ0XG4gICAgICApO1xuXG4gICAgICB0aGlzLiNzZXRJbmRleChpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgI2luaXQoKSB7XG4gICAgdGhpcy5hbmltYXRlZFNjcm9sbCA9IG5ldyBBbmltYXRlZFZhbHVlKHtcbiAgICAgIGN1cnJlbnRWYWx1ZTogMCxcbiAgICAgIGlzSW5jcmVtZW50QnlQZXJjZW50YWdlOiB0cnVlLFxuICAgICAgaW5jcmVtZW50OiAwLjEsXG4gICAgICBtYXg6IHRoaXMuaXNIb3Jpem9udGFsXG4gICAgICAgID8gdGhpcy4jZ2V0SG9yaXpvbnRhbFNjcm9sbFNpemUoKVxuICAgICAgICA6IHRoaXMuI2dldFZlcnRpY2FsU2Nyb2xsU2l6ZSgpLFxuICAgICAgbWluOiAwLFxuICAgICAgb25DaGFuZ2VDYWxsYmFjazogdGhpcy4jaGFuZGxlQW5pbWF0ZWRTY3JvbGxDaGFuZ2UsXG4gICAgfSk7XG5cbiAgICB0aGlzLmFuaW1hdGVkU2Nyb2xsLm9uVHJhbnNpdGlvblN0YXJ0KCgpID0+IHtcbiAgICAgIHRoaXMuaXNBbmltYXRpbmdTY3JvbGwgPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hbmltYXRlZFNjcm9sbC5vblRyYW5zaXRpb25FbmQoKCkgPT4ge1xuICAgICAgdGhpcy5pc0FuaW1hdGluZ1Njcm9sbCA9IGZhbHNlO1xuICAgIH0pO1xuXG4gICAgdGhpcy4jd2F0Y2hSZXNpemUoKTtcbiAgICB0aGlzLiN3YXRjaFdoZWVsKCk7XG4gICAgdGhpcy4jd2F0Y2hTY3JvbGwoKTtcblxuICAgIGlmICh0aGlzLmlzTGF6eU1vZGUpIHtcbiAgICAgIHRoaXMuI3dhdGNoTGF6eUxvYWRJbWFnZXMoKTtcbiAgICB9XG4gIH1cblxuICAjd2F0Y2hSZXNpemUgPSAoKSA9PiB7XG4gICAgdGhpcy4jb25XaW5kb3dDaGFuZ2UoKTtcblxuICAgIGlmICh3aW5kb3cuUmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIodGhpcy4jaGFuZGxlUmVzaXplQ2hhbmdlKS5vYnNlcnZlKFxuICAgICAgICB0aGlzLnNsaWRlckxpc3RFbGVtZW50XG4gICAgICApO1xuICAgIH1cbiAgICBlbHNlIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLiNoYW5kbGVSZXNpemVDaGFuZ2UpO1xuICB9O1xuXG4gICN3YXRjaFdoZWVsID0gKCkgPT4ge1xuICAgIHRoaXMuc2xpZGVyTGlzdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgIFwid2hlZWxcIixcbiAgICAgIChlKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLndoZWVsRW5hYmxlZCkge1xuICAgICAgICAgIHRoaXMuYW5pbWF0ZWRTY3JvbGwuYWRkVG9GaW5hbFZhbHVlKGUuZGVsdGFZKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHsgcGFzc2l2ZTogdHJ1ZSB9XG4gICAgKTtcbiAgfTtcblxuICAjd2F0Y2hTY3JvbGwgPSAoKSA9PiB7XG4gICAgdGhpcy5zbGlkZXJMaXN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgXCJzY3JvbGxcIixcbiAgICAgICgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQW5pbWF0aW5nU2Nyb2xsKSB7XG4gICAgICAgICAgdGhpcy4jc3luY0FuaW1hdGVkU2Nyb2xsKHRoaXMuI2dldFNjcm9sbCgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuI2NhbGN1bGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXNzaXZlOiB0cnVlLFxuICAgICAgfVxuICAgICk7XG4gIH07XG5cbiAgI3dhdGNoTGF6eUxvYWRJbWFnZXMgPSAoKSA9PiB7XG4gICAgY29uc3QgbGF6eUltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke0xBWllfTE9BRF9JTUFHRV9DTEFTU31gKTtcblxuICAgIGNvbnN0IGltYWdlT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoXG4gICAgICAoZW50cmllcykgPT4ge1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IGVudHJ5LnRhcmdldDtcblxuICAgICAgICAgICAgaWYgKGltYWdlLmhhc0F0dHJpYnV0ZShcImRhdGEtc3Jjc2V0XCIpKSB7XG4gICAgICAgICAgICAgIGltYWdlLnNldEF0dHJpYnV0ZShcInNyY3NldFwiLCBpbWFnZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY3NldFwiKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbWFnZS5oYXNBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiKSkge1xuICAgICAgICAgICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgaW1hZ2UuZ2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbWFnZU9ic2VydmVyLnVub2JzZXJ2ZShpbWFnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICB7IHJvb3RNYXJnaW46IFwiMTUwcHhcIiwgcm9vdDogdGhpcy5zbGlkZXJMaXN0RWxlbWVudCB9XG4gICAgKTtcblxuICAgIGxhenlJbWFnZXMuZm9yRWFjaCgoaW1nKSA9PiBpbWFnZU9ic2VydmVyLm9ic2VydmUoaW1nKSk7XG4gIH07XG5cbiAgI2NhbGN1bGF0ZUFjdGl2ZUluZGV4ID0gKCkgPT4ge1xuICAgIHRoaXMuY3VycmVudFBvc2l0aW9uID0gdGhpcy4jZ2V0U2Nyb2xsKCk7XG4gICAgY29uc3QgaXRlbXNMYXN0SW5kZXggPSB0aGlzLnNsaWRlckl0ZW1zLmxlbmd0aCAtIDE7XG5cbiAgICAvLyBjb25zdCBkaXJlY3Rpb25Qcm9wID0gdGhpcy5pc0hvcml6b250YWwgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIjtcblxuICAgIC8vIGNvbnN0IHdpbmRvd1NpemUgPSB0aGlzLmlzSG9yaXpvbnRhbFxuICAgIC8vICAgPyB0aGlzLnNsaWRlckxpc3RFbGVtZW50LmNsaWVudFdpZHRoXG4gICAgLy8gICA6IHRoaXMuc2xpZGVyTGlzdEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXG4gICAgLy9Vc2VkIHRvIHRyaWdnZXIgYXMgYWN0aXZlIGFzIHNvb24gWCBwZXJjZW50YWdlIG9mIHRoZSB3aW5kb3cgY29udGFpbnMgdGhlIGVsZW1lbnRcbiAgICAvLyBjb25zdCB3aW5kb3dTaXplVG9BY3RpdmUgPSB3aW5kb3dTaXplICogV0lORE9XX1BFUkNFTlRBR0VfT05fSVRFTV9UT19BQ1RJVkU7XG5cbiAgICBpZiAodGhpcy5wcmV2UG9zaXRpb24gfHwgdGhpcy5uZXh0UG9zaXRpb24pIHtcbiAgICAgIGlmICgoIXRoaXMucHJldlBvc2l0aW9uIHx8IHRoaXMuY3VycmVudFBvc2l0aW9uID49IHRoaXMucHJldlBvc2l0aW9uKSAmJiAoIXRoaXMubmV4dFBvc2l0aW9uIHx8IHRoaXMuY3VycmVudFBvc2l0aW9uIDwgdGhpcy5uZXh0UG9zaXRpb24pKSByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIHRoaXMuc2xpZGVySXRlbXMuZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBpc0xhc3QgPSBpdGVtc0xhc3RJbmRleCA9PT0gaW5kZXg7XG4gICAgICBjb25zdCBuZXh0SW5kZXggPSBpc0xhc3QgPyBpbmRleCA6IGluZGV4ICsgMTtcblxuICAgICAgLy8gY29uc3QgaXRlbVBvc2l0aW9uID1cbiAgICAgIC8vICAgdGhpcy5pdGVtc1Bvc2l0aW9uW2luZGV4XVtkaXJlY3Rpb25Qcm9wXS5zdGFydCAtIHdpbmRvd1NpemVUb0FjdGl2ZTtcbiAgICAgIC8vIGNvbnN0IG5leHRJdGVtUG9zaXRpb24gPVxuICAgICAgLy8gICB0aGlzLml0ZW1zUG9zaXRpb25bbmV4dEluZGV4XVtkaXJlY3Rpb25Qcm9wXS5zdGFydCAtIHdpbmRvd1NpemVUb0FjdGl2ZTtcblxuICAgICAgY29uc3QgbWFyZ2luID0gMTAwO1xuXG4gICAgICBjb25zdCBpdGVtQm91bmRpbmdzID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBcbiAgICAgIGNvbnN0IGN1cnJlbnRJdGVtUG9zaXRpb24gPSB0aGlzLmN1cnJlbnRQb3NpdGlvbiArICh0aGlzLmlzSG9yaXpvbnRhbCA/IGl0ZW1Cb3VuZGluZ3MubGVmdCA6IGl0ZW1Cb3VuZGluZ3MudG9wKSAtIG1hcmdpbjtcblxuICAgICAgY29uc3QgbmV4dEl0ZW1Cb3VuZGluZ3MgPSBpc0xhc3QgPyBudWxsIDogdGhpcy5zbGlkZXJJdGVtc1tuZXh0SW5kZXhdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgXG4gICAgICBjb25zdCBuZXh0SXRlbVBvc2l0aW9uID0gaXNMYXN0ID8gbnVsbCA6IHRoaXMuY3VycmVudFBvc2l0aW9uICsgKHRoaXMuaXNIb3Jpem9udGFsID8gbmV4dEl0ZW1Cb3VuZGluZ3MubGVmdCA6IG5leHRJdGVtQm91bmRpbmdzLnRvcCkgLSBtYXJnaW47XG5cbiAgICAgIGNvbnN0IGlzQWN0aXZlSW5kZXggPSB0aGlzLmN1cnJlbnRQb3NpdGlvbiA+PSBjdXJyZW50SXRlbVBvc2l0aW9uICYmIChpc0xhc3QgfHwgdGhpcy5jdXJyZW50UG9zaXRpb24gPCBuZXh0SXRlbVBvc2l0aW9uKTtcblxuICAgICAgLy8gY29uc3QgaXNMb3dlclRoYW5TY3JvbGxEaXN0YW5jZSA9IGl0ZW1Qb3NpdGlvbiA8PSBjdXJyZW50U2Nyb2xsO1xuICAgICAgLy8gY29uc3QgbmV4dFBvc2l0aW9uSXNMb3dlclRoYW5TY3JvbGxEaXN0YW5jZSA9XG4gICAgICAvLyAgIG5leHRJdGVtUG9zaXRpb24gPD0gY3VycmVudFNjcm9sbDtcblxuICAgICAgLy8gY29uc3QgaXNBY3RpdmVJbmRleCA9XG4gICAgICAvLyAgIGlzTG93ZXJUaGFuU2Nyb2xsRGlzdGFuY2UgJiZcbiAgICAgIC8vICAgKCFuZXh0UG9zaXRpb25Jc0xvd2VyVGhhblNjcm9sbERpc3RhbmNlIHx8IGlzTGFzdCk7XG5cbiAgICAgIGlmIChpc0FjdGl2ZUluZGV4KSB7XG4gICAgICAgIHRoaXMucHJldlBvc2l0aW9uID0gaW5kZXggPT0gMCA/IG51bGwgOiBjdXJyZW50SXRlbVBvc2l0aW9uO1xuICAgICAgICB0aGlzLm5leHRQb3NpdGlvbiA9IG5leHRJdGVtUG9zaXRpb247XG4gICAgICAgIHRoaXMuI3NldEluZGV4KGluZGV4KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICAjaGFuZGxlUmVzaXplQ2hhbmdlID0gZGVib3VuY2UoKCkgPT4ge1xuICAgIHRoaXMuI29uV2luZG93Q2hhbmdlKCk7XG4gIH0sIDEwMCk7XG5cbiAgI2hhbmRsZUFuaW1hdGVkU2Nyb2xsQ2hhbmdlID0gKHNjcm9sbFZhbHVlKSA9PiB7XG4gICAgaWYgKHRoaXMud2hlZWxFbmFibGVkKSB7XG4gICAgICB0aGlzLiNzZXRTY3JvbGwoc2Nyb2xsVmFsdWUpO1xuICAgIH1cbiAgfTtcblxuICAjb25XaW5kb3dDaGFuZ2UgPSAoKSA9PiB7XG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gU0NSRUVOX1RZUEUudGFibGV0X3BvcnQgJiYgIXRoaXMuaXNIb3Jpem9udGFsKSB7XG4gICAgICB0aGlzLmlzSG9yaXpvbnRhbCA9IHRydWU7XG4gICAgICB0aGlzLiNzZXREaXJlY3Rpb24oXCJob3Jpem9udGFsXCIpO1xuICAgICAgdGhpcy4jc3luY0FuaW1hdGVkU2Nyb2xsKDApO1xuICAgIH1cblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSBTQ1JFRU5fVFlQRS50YWJsZXRfcG9ydCAmJiB0aGlzLmlzSG9yaXpvbnRhbCkge1xuICAgICAgdGhpcy5pc0hvcml6b250YWwgPSBmYWxzZTtcbiAgICAgIHRoaXMuI3NldERpcmVjdGlvbihcInZlcnRpY2FsXCIpO1xuICAgICAgdGhpcy4jc3luY0FuaW1hdGVkU2Nyb2xsKDApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzSG9yaXpvbnRhbCkge1xuICAgICAgdGhpcy5hbmltYXRlZFNjcm9sbC5zZXRNYXgodGhpcy4jZ2V0SG9yaXpvbnRhbFNjcm9sbFNpemUoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYW5pbWF0ZWRTY3JvbGwuc2V0TWF4KHRoaXMuI2dldFZlcnRpY2FsU2Nyb2xsU2l6ZSgpKTtcbiAgICB9XG5cbiAgICAvLyB0aGlzLiNjYWxjdWxhdGVJdGVtc1Bvc2l0aW9uKCk7XG4gIH07XG5cbiAgI2Rpc2FibGVXaGVlbCgpIHtcbiAgICBpZiAodGhpcy53aGVlbEVuYWJsZWQpIHtcbiAgICAgIHRoaXMuYW5pbWF0ZWRTY3JvbGwuc3RvcEFuaW1hdGlvbigpO1xuICAgICAgdGhpcy53aGVlbEVuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAjZW5hYmxlV2hlZWwoKSB7XG4gICAgaWYgKCF0aGlzLndoZWVsRW5hYmxlZCkge1xuICAgICAgY29uc3Qgc2Nyb2xsVmFsdWUgPSB0aGlzLiNnZXRTY3JvbGwoKTtcbiAgICAgIHRoaXMuI3N5bmNBbmltYXRlZFNjcm9sbChzY3JvbGxWYWx1ZSk7XG4gICAgICB0aGlzLndoZWVsRW5hYmxlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgI2dldEhvcml6b250YWxTY3JvbGxTaXplID0gKCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnNsaWRlckxpc3RFbGVtZW50LnNjcm9sbFdpZHRoIC1cbiAgICAgIHRoaXMuc2xpZGVyTGlzdEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcbiAgICApO1xuICB9O1xuXG4gICNnZXRWZXJ0aWNhbFNjcm9sbFNpemUgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuc2xpZGVyTGlzdEVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuICB9O1xuXG4gIC8vICNjYWxjdWxhdGVJdGVtc1Bvc2l0aW9uID0gKCkgPT4ge1xuICAvLyAgIGNvbnN0IGxpc3RTY3JvbGwgPSB0aGlzLiNnZXRTY3JvbGwoKTtcblxuICAvLyAgIHRoaXMuaXRlbXNQb3NpdGlvbiA9IHRoaXMuc2xpZGVySXRlbXMubWFwKChzbGlkZXJJdGVtKSA9PiB7XG4gIC8vICAgICBjb25zdCB7IGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCB9ID0gc2xpZGVySXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAvLyAgICAgY29uc3QgaG9yaXpvbnRhbFN0YXJ0ID0gbGVmdCArIGxpc3RTY3JvbGw7XG4gIC8vICAgICBjb25zdCBob3Jpem9udGFsRW5kID0gaG9yaXpvbnRhbFN0YXJ0ICsgd2lkdGg7XG5cbiAgLy8gICAgIGNvbnN0IHZlcnRpY2FsU3RhcnQgPSB0b3AgKyBsaXN0U2Nyb2xsO1xuICAvLyAgICAgY29uc3QgdmVydGljYWxFbmQgPSB2ZXJ0aWNhbFN0YXJ0ICsgaGVpZ2h0O1xuXG4gIC8vICAgICBjb25zdCBwb3NpdGlvbiA9IHtcbiAgLy8gICAgICAgaG9yaXpvbnRhbDoge1xuICAvLyAgICAgICAgIHN0YXJ0OiBob3Jpem9udGFsU3RhcnQsXG4gIC8vICAgICAgICAgZW5kOiBob3Jpem9udGFsRW5kLFxuICAvLyAgICAgICAgIHNpemU6IHdpZHRoLFxuICAvLyAgICAgICB9LFxuICAvLyAgICAgICB2ZXJ0aWNhbDoge1xuICAvLyAgICAgICAgIHN0YXJ0OiB2ZXJ0aWNhbFN0YXJ0LFxuICAvLyAgICAgICAgIGVuZDogdmVydGljYWxFbmQsXG4gIC8vICAgICAgICAgc2l6ZTogaGVpZ2h0LFxuICAvLyAgICAgICB9LFxuICAvLyAgICAgfTtcblxuICAvLyAgICAgcmV0dXJuIHBvc2l0aW9uO1xuICAvLyAgIH0pO1xuICAvLyB9O1xuXG4gIC8qKlxuICAgKlxuICAgKlxuICAgKiBAcGFyYW0ge1wiaG9yaXpvbnRhbFwifFwidmVydGljYWxcIn0gW3N0YXRlPVwiaG9yaXpvbnRhbFwiXVxuICAgKiBAbWVtYmVyb2YgU2xpZGVyXG4gICAqL1xuICAjc2V0RGlyZWN0aW9uID0gKGRpcmVjdGlvbiA9IFwiaG9yaXpvbnRhbFwiKSA9PiB7XG4gICAgdGhpcy5pc0hvcml6b250YWwgPSBkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiO1xuXG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5pc0hvcml6b250YWwgPyBcInJlbW92ZVwiIDogXCJhZGRcIjtcblxuICAgIHRoaXMuc2xpZGVyTGlzdEVsZW1lbnQuY2xhc3NMaXN0W2FjdGlvbl0odGhpcy5zbGlkZXJMaXN0VmVydGljYWxDbGFzcyk7XG4gIH07XG5cbiAgI2dldFNjcm9sbCA9ICgpID0+IHtcbiAgICBjb25zdCBzY3JvbGxQb3NpdGlvbiA9IHRoaXMuaXNIb3Jpem9udGFsID8gXCJzY3JvbGxMZWZ0XCIgOiBcInNjcm9sbFRvcFwiO1xuICAgIHJldHVybiB0aGlzLnNsaWRlckxpc3RFbGVtZW50W3Njcm9sbFBvc2l0aW9uXTtcbiAgfTtcblxuICAjc2V0U2Nyb2xsID0gKHNjcm9sbFZhbHVlKSA9PiB7XG4gICAgY29uc3Qgc2Nyb2xsUG9zaXRpb24gPSB0aGlzLmlzSG9yaXpvbnRhbCA/IFwic2Nyb2xsTGVmdFwiIDogXCJzY3JvbGxUb3BcIjtcbiAgICB0aGlzLnNsaWRlckxpc3RFbGVtZW50W3Njcm9sbFBvc2l0aW9uXSA9IHNjcm9sbFZhbHVlO1xuXG4gICAgdGhpcy4jb25TbGlkZXJNb3ZlbWVudExpc3RlbmVycy5wdWJsaXNoKCk7XG4gIH07XG5cbiAgI3NldEluZGV4ID0gKGluZGV4KSA9PiB7XG4gICAgaWYgKGluZGV4ICE9PSB0aGlzLmFjdGl2ZUluZGV4KSB7XG4gICAgICB0aGlzLmFjdGl2ZUluZGV4ID0gaW5kZXg7XG4gICAgICB0aGlzLiNvbkluZGV4Q2hhbmdlTGlzdGVuZXJzLnB1Ymxpc2goaW5kZXgpO1xuICAgIH1cbiAgfTtcblxuICAjc3luY0FuaW1hdGVkU2Nyb2xsID0gKHZhbHVlKSA9PiB7XG4gICAgdGhpcy5hbmltYXRlZFNjcm9sbC5zZXRGaW5hbFZhbHVlKHZhbHVlLCBmYWxzZSk7XG4gIH07XG5cbiAgLy9MaXN0ZW5lcnNcbiAgb25JbmRleENoYW5nZSA9IChsaXN0ZW5lcikgPT4ge1xuICAgIHJldHVybiB0aGlzLiNvbkluZGV4Q2hhbmdlTGlzdGVuZXJzLnN1YnNjcmliZShsaXN0ZW5lcik7XG4gIH07XG5cbiAgb25TbGlkZXJNb3ZlbWVudCA9IChsaXN0ZW5lcikgPT4ge1xuICAgIHJldHVybiB0aGlzLiNvblNsaWRlck1vdmVtZW50TGlzdGVuZXJzLnN1YnNjcmliZShsaXN0ZW5lcik7XG4gIH07XG59XG4iLCJcbmV4cG9ydCBjbGFzcyBSZWdpb25TZWxlY3RvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucmVnaW9uSWRBdHRyaWJ1dGUgPSBcImRhdGEtcmVnaW9uLWlkXCI7XG4gICAgLy9tYXBcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlZ2lvbnNcIik7XG4gICAgdGhpcy5yZWdpb25zID0gQXJyYXkuZnJvbShcbiAgICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbJHt0aGlzLnJlZ2lvbklkQXR0cmlidXRlfV1gKVxuICAgICk7XG5cbiAgICAvL2lzbGFuZHNcbiAgICB0aGlzLmlzbGFuZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlZ2lvbl9faG9tZV9faXNsYW5kc1wiKTtcblxuICAgIHRoaXMuaXNXYXRjaGluZ0NsaWNrID0gZmFsc2U7XG5cbiAgICBsZXQgaXNIb3Jpem9udGFsID0gbnVsbDtcbiAgICBjb25zdCBtb2JpbGVWaWV3Qm94ID0gJzMyMCA3MCA0MDAgMTAwMCc7XG4gICAgY29uc3QgaW5pdGlhbFZpZXdCb3ggPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCd2aWV3Qm94Jyk7XG4gICAgY29uc3QgZGltZW5zaW9uID0gNzY4O1xuXG4gICAgY29uc3Qgb25SZXNpemUgPSAoKSA9PiB7XG4gICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiBkaW1lbnNpb24gJiYgaXNIb3Jpem9udGFsICE9IHRydWUpIHtcbiAgICAgICAgaXNIb3Jpem9udGFsID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgndmlld0JveCcsIGluaXRpYWxWaWV3Qm94KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IGRpbWVuc2lvbiAmJiBpc0hvcml6b250YWwgIT0gZmFsc2UpIHtcbiAgICAgICAgaXNIb3Jpem9udGFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCBtb2JpbGVWaWV3Qm94KTtcbiAgICAgIH1cbiAgICB9XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uUmVzaXplKTtcbiAgICBvblJlc2l6ZSgpO1xuXG4gIH1cblxuICB3YXRjaE1hcENsaWNrKCkge1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgXCJjbGlja1wiLFxuICAgICAgKGUpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGUudGFyZ2V0O1xuICAgICAgICBjb25zdCByZWdpb25JZEF0dHJpYnV0ZSA9IHRhcmdldEVsZW1lbnQuZ2V0QXR0cmlidXRlKFxuICAgICAgICAgIHRoaXMucmVnaW9uSWRBdHRyaWJ1dGVcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHJlZ2lvbklkQXR0cmlidXRlKSB7XG4gICAgICAgICAgdGhpcy5vbkl0ZW1DbGljayhwYXJzZUludChyZWdpb25JZEF0dHJpYnV0ZSkpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgeyBwYXNzaXZlOiB0cnVlIH1cbiAgICApO1xuICB9XG5cbiAgd2F0Y2hJc2xhbmRzQ2xpY2soKSB7XG4gICAgdGhpcy5pc2xhbmRzLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBcImNsaWNrXCIsXG4gICAgICAoZSkgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZS50YXJnZXQuY2xvc2VzdChgLnJlZ2lvbl9faG9tZV9faXNsYW5kYCk7XG5cbiAgICAgICAgY29uc3QgcmVnaW9uSWRBdHRyaWJ1dGUgPSB0YXJnZXRFbGVtZW50LmdldEF0dHJpYnV0ZShcbiAgICAgICAgICB0aGlzLnJlZ2lvbklkQXR0cmlidXRlXG4gICAgICAgICk7XG4gICAgICAgIGlmIChyZWdpb25JZEF0dHJpYnV0ZSkge1xuICAgICAgICAgIHRoaXMub25JdGVtQ2xpY2socGFyc2VJbnQocmVnaW9uSWRBdHRyaWJ1dGUpKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHsgcGFzc2l2ZTogdHJ1ZSB9XG4gICAgKTtcbiAgfVxuXG4gIGJpbmRPbkl0ZW1DbGljayA9IChjYWxsYmFjaykgPT4ge1xuICAgIHRoaXMub25JdGVtQ2xpY2sgPSBjYWxsYmFjaztcblxuICAgIGlmICghdGhpcy5pc1dhdGNoaW5nQ2xpY2spIHtcbiAgICAgIHRoaXMuaXNXYXRjaGluZ0NsaWNrID0gdHJ1ZTtcbiAgICAgIHRoaXMud2F0Y2hNYXBDbGljaygpO1xuICAgICAgdGhpcy53YXRjaElzbGFuZHNDbGljaygpO1xuICAgIH1cbiAgfTtcbn1cbiIsImltcG9ydCB7IFNsaWRlciB9IGZyb20gXCIuLi8uLi9jb21wb25lbnRzL3NsaWRlclwiO1xuaW1wb3J0IHsgcmVnaW9uSWRUb1N2Z05hbWUgfSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcblxuZXhwb3J0IGNsYXNzIFJlZ2lvblNsaWRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaG9tZVNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVnaW9uX19ob21lXCIpO1xuICAgIHRoaXMuZ29CYWNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZWdpb25fX3NsaWRlcl9fYnV0dG9uXCIpO1xuICAgIHRoaXMuZ29CYWNrQnV0dG9uSWNvbiA9IHRoaXMuZ29CYWNrQnV0dG9uLnF1ZXJ5U2VsZWN0b3IoXCJ1c2VcIik7XG4gICAgdGhpcy5nb0JhY2tCdXR0b25WaXNpYmxlQ2xhc3MgPSBcInJlZ2lvbl9fc2xpZGVyX19idXR0b24tLXZpc2libGVcIjtcblxuICAgIHRoaXMub3JiID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZWdpb25fX3NsaWRlcl9fb3JiXCIpO1xuICAgIHRoaXMub3JiVmlzaWJsZUNsYXNzID0gXCJyZWdpb25fX3NsaWRlcl9fb3JiLS12aXNpYmxlXCI7XG5cbiAgICB0aGlzLmdvQmFja0J1dHRvbklzVmlzaWJsZSA9IGZhbHNlO1xuICAgIHRoaXMub3JiSXNWaXNpYmxlID0gZmFsc2U7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5zbGlkZXIgPSBuZXcgU2xpZGVyKHtcbiAgICAgIHNsaWRlckNsYXNzOiBcInJlZ2lvbl9fc2xpZGVyXCIsXG4gICAgICBzbGlkZXJMaXN0Q2xhc3M6IFwicmVnaW9uX19zbGlkZXJfX2xpc3RcIixcbiAgICAgIHNsaWRlckl0ZW1DbGFzczogXCJyZWdpb25fX3NsaWRlcl9faXRlbVwiLFxuICAgICAgbGF6eTogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHRoaXMuc2xpZGVyLm9uSW5kZXhDaGFuZ2UodGhpcy5oYW5kbGVTbGlkZUNoYW5nZSk7XG5cbiAgICB0aGlzLndhdGNoRmlyc3RTbGlkZVZpc2liaWxpdHkoKTtcbiAgICB0aGlzLndhdGNoR29CYWNrQ2xpY2soKTtcblxuICAgIHRoaXMuc2xpZGVycyA9IEFycmF5LmZyb20oXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucmVnaW9uX19zbGlkZXJfX2l0ZW1gKVxuICAgICk7XG5cbiAgICB0aGlzLnNsaWRlcnNCeVJlZ2lvbiA9IHRoaXMuc2xpZGVycy5yZWR1Y2UoKGFjYywgaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHJlZ2lvbklkID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXJlZ2lvbi1pZFwiKTtcblxuICAgICAgaWYgKHJlZ2lvbklkKSB7XG4gICAgICAgIGFjY1tyZWdpb25JZF0gPSBpbmRleDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG4gIH1cblxuICBnb1RvUmVnaW9uID0gKHJlZ2lvbklkKSA9PiB7XG4gICAgY29uc3Qgc2xpZGVySW5kZXggPSB0aGlzLnNsaWRlcnNCeVJlZ2lvbltyZWdpb25JZF07XG5cbiAgICBpZiAoc2xpZGVySW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zbGlkZXIuZ29Ub0luZGV4KHNsaWRlckluZGV4KTtcbiAgICB9XG4gIH07XG5cbiAgd2F0Y2hGaXJzdFNsaWRlVmlzaWJpbGl0eSA9ICgpID0+IHtcbiAgICBjb25zdCBpbnRlcnNlY3Rpb25IYW5kbGVyID0gKGVudHJpZXMpID0+IHtcbiAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICAgICAgdGhpcy50b2dnbGVHb0JhY2tCdXR0b25WaXNpYmxpdHkoZmFsc2UpO1xuICAgICAgICAgIHRoaXMudG9nZ2xlT3JiVmlzaWJsaXR5KGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZUdvQmFja0J1dHRvblZpc2libGl0eSh0cnVlKTtcbiAgICAgICAgICB0aGlzLnRvZ2dsZU9yYlZpc2libGl0eSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGludGVyc2VjdGlvbkhhbmRsZXIpO1xuICAgIG9ic2VydmVyLm9ic2VydmUodGhpcy5ob21lU2xpZGVyKTtcbiAgfTtcblxuICB3YXRjaEdvQmFja0NsaWNrKCkge1xuICAgIHRoaXMuZ29CYWNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBcImNsaWNrXCIsXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2xpZGVyLmdvVG9JbmRleCgwKTtcbiAgICAgIH0sXG4gICAgICB7IHBhc3NpdmU6IHRydWUgfVxuICAgICk7XG4gIH1cblxuICBoYW5kbGVTbGlkZUNoYW5nZSA9IChhY3RpdmVJbmRleCkgPT4ge1xuICAgIGlmIChhY3RpdmVJbmRleCA+PSAxKSB7XG4gICAgICBjb25zdCBzbGlkZXJSZWdpb25JZCA9IHRoaXMuZ2V0U2xpZGVySXRlbVJlZ2lvbklkKFxuICAgICAgICB0aGlzLnNsaWRlcnNbYWN0aXZlSW5kZXhdXG4gICAgICApO1xuXG4gICAgICBpZiAoc2xpZGVyUmVnaW9uSWQpIHtcbiAgICAgICAgdGhpcy5zZXRCYWNrQnV0dG9uUmVnaW9uTWFwKHNsaWRlclJlZ2lvbklkKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdG9nZ2xlR29CYWNrQnV0dG9uVmlzaWJsaXR5ID0gKHNob3cpID0+IHtcbiAgICBpZiAoIXRoaXMuZ29CYWNrQnV0dG9uSXNWaXNpYmxlICYmIHNob3cpIHtcbiAgICAgIHRoaXMuZ29CYWNrQnV0dG9uSXNWaXNpYmxlID0gdHJ1ZTtcbiAgICAgIHRoaXMuZ29CYWNrQnV0dG9uLmNsYXNzTGlzdC5hZGQodGhpcy5nb0JhY2tCdXR0b25WaXNpYmxlQ2xhc3MpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5nb0JhY2tCdXR0b25Jc1Zpc2libGUgJiYgIXNob3cpIHtcbiAgICAgIHRoaXMuZ29CYWNrQnV0dG9uSXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICB0aGlzLmdvQmFja0J1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ29CYWNrQnV0dG9uVmlzaWJsZUNsYXNzKTtcbiAgICB9XG4gIH07XG5cbiAgdG9nZ2xlT3JiVmlzaWJsaXR5ID0gKHNob3cpID0+IHtcbiAgICBpZiAoIXRoaXMub3JiSXNWaXNpYmxlICYmIHNob3cpIHtcbiAgICAgIHRoaXMub3JiSXNWaXNpYmxlID0gdHJ1ZTtcbiAgICAgIHRoaXMub3JiLmNsYXNzTGlzdC5hZGQodGhpcy5vcmJWaXNpYmxlQ2xhc3MpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vcmJJc1Zpc2libGUgJiYgIXNob3cpIHtcbiAgICAgIHRoaXMub3JiSXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICB0aGlzLm9yYi5jbGFzc0xpc3QucmVtb3ZlKHRoaXMub3JiVmlzaWJsZUNsYXNzKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0U2xpZGVySXRlbVJlZ2lvbklkID0gKGl0ZW0pID0+IHtcbiAgICByZXR1cm4gaXRlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXJlZ2lvbi1pZFwiKTtcbiAgfTtcblxuICBzZXRCYWNrQnV0dG9uUmVnaW9uTWFwID0gKHJlZ2lvbklkKSA9PiB7XG4gICAgY29uc3QgcmVnaW9uU3ZnTmFtZSA9IHJlZ2lvbklkVG9TdmdOYW1lW3BhcnNlSW50KHJlZ2lvbklkKV07XG4gICAgY29uc3Qgc3ZnUGF0aCA9IHRoaXMuZ29CYWNrQnV0dG9uSWNvbi5nZXRBdHRyaWJ1dGUoXCJ4bGluazpocmVmXCIpO1xuICAgIGNvbnN0IHVwZGF0ZWRTdmdQYXRoID0gc3ZnUGF0aC5yZXBsYWNlKFxuICAgICAgLyguKlxcI2ljb24tKSguKikvLFxuICAgICAgYCQxJHtyZWdpb25TdmdOYW1lfWBcbiAgICApO1xuXG4gICAgdGhpcy5nb0JhY2tCdXR0b25JY29uLnNldEF0dHJpYnV0ZShcInhsaW5rOmhyZWZcIiwgdXBkYXRlZFN2Z1BhdGgpO1xuICB9O1xufVxuIiwiaW1wb3J0IHsgUmVnaW9uU2xpZGVyIH0gZnJvbSBcIi4vc2xpZGVyXCI7XG5pbXBvcnQgeyBSZWdpb25TZWxlY3RvciB9IGZyb20gXCIuL3JlZ2lvbi1zZWxlY3RvclwiO1xuXG4kKGZ1bmN0aW9uICgpIHtcbiAgY29uc3Qgc2xpZGVyID0gbmV3IFJlZ2lvblNsaWRlcigpO1xuICBjb25zdCByZWdpb25TZWxlY3RvciA9IG5ldyBSZWdpb25TZWxlY3RvcigpO1xuXG4gIHJlZ2lvblNlbGVjdG9yLmJpbmRPbkl0ZW1DbGljaygocmVnaW9uSWQpID0+IHtcbiAgICBzbGlkZXIuZ29Ub1JlZ2lvbihyZWdpb25JZCk7XG4gIH0pO1xufSk7XG4iLCJleHBvcnQgY29uc3QgZGVib3VuY2UgPSAoZnVuYywgZGVsYXkgPSAwKSA9PiB7XG4gIGxldCB0aW1lb3V0SWQ7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcztcbiAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgaWYgKHRpbWVvdXRJZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgfVxuXG4gICAgdGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIH0sIGRlbGF5KTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCB0aHJvdHRsZSA9IChmdW5jLCB0aW1lID0gMCkgPT4ge1xuICBsZXQgd2FpdCA9IGZhbHNlO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzO1xuICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICBpZiAoIXdhaXQpIHtcbiAgICAgIHdhaXQgPSB0cnVlO1xuICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHdhaXQgPSBmYWxzZTtcbiAgICAgIH0sIHRpbWUpO1xuICAgIH1cbiAgfTtcbn07XG5cbi8vIGFkYXB0ZWQgZnJvbSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9hbGlyZXphcy9jNGY5ZjQzZTlmZTFhYmJhOWE0ODI0ZGQ2ZmM2MGE1NVxuZXhwb3J0IGZ1bmN0aW9uIGZhZGVPdXQoZWwpIHtcbiAgZWwuc3R5bGUub3BhY2l0eSA9IDE7XG4gIGxldCBjYW5jZWxlZCA9IGZhbHNlO1xuXG4gIChmdW5jdGlvbiBmYWRlKCkge1xuICAgIGlmIChjYW5jZWxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICgoZWwuc3R5bGUub3BhY2l0eSAtPSAwLjEpIDwgMCkge1xuICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZmFkZSk7XG4gICAgfVxuICB9KSgpO1xuXG4gIHJldHVybiB7XG4gICAgY2FuY2VsOiAoKSA9PiB7XG4gICAgICBjYW5jZWxlZCA9IHRydWU7XG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZhZGVJbihlbCwgZGlzcGxheSkge1xuICBlbC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgZWwuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXkgfHwgXCJibG9ja1wiO1xuICBsZXQgY2FuY2VsZWQgPSBmYWxzZTtcblxuICAoZnVuY3Rpb24gZmFkZSgpIHtcbiAgICBpZiAoY2FuY2VsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgdmFsID0gcGFyc2VGbG9hdChlbC5zdHlsZS5vcGFjaXR5KTtcblxuICAgIGlmICghKCh2YWwgKz0gMC4xKSA+IDEpKSB7XG4gICAgICBlbC5zdHlsZS5vcGFjaXR5ID0gdmFsO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZhZGUpO1xuICAgIH1cbiAgfSkoKTtcblxuICByZXR1cm4ge1xuICAgIGNhbmNlbDogKCkgPT4ge1xuICAgICAgY2FuY2VsZWQgPSB0cnVlO1xuICAgIH0sXG4gIH07XG59XG5cbi8qKlxuICpcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbnB1dE1pblxuICogQHBhcmFtIHtudW1iZXJ9IGlucHV0TWF4XG4gKiBAcGFyYW0ge251bWJlcn0gb3V0cHV0TWluXG4gKiBAcGFyYW0ge251bWJlcn0gb3V0cHV0TWF4XG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtjbGFtcD1mYWxzZV1cbiAqIEByZXR1cm4geyp9XG4gKi9cbmNvbnN0IGludGVycG9sYXRlID0gKFxuICB2YWx1ZSxcbiAgaW5wdXRNaW4sXG4gIGlucHV0TWF4LFxuICBvdXRwdXRNaW4sXG4gIG91dHB1dE1heCxcbiAgY2xhbXAgPSBmYWxzZVxuKSA9PiB7XG4gIGxldCByZXN1bHQgPSB2YWx1ZTtcblxuICAvLyBFeHRyYXBvbGF0ZVxuICBpZiAocmVzdWx0IDwgaW5wdXRNaW4pIHtcbiAgICBpZiAoY2xhbXApIHtcbiAgICAgIHJlc3VsdCA9IGlucHV0TWluO1xuICAgIH1cbiAgfVxuXG4gIGlmIChyZXN1bHQgPiBpbnB1dE1heCkge1xuICAgIGlmIChjbGFtcCkge1xuICAgICAgcmVzdWx0ID0gaW5wdXRNYXg7XG4gICAgfVxuICB9XG5cbiAgaWYgKG91dHB1dE1pbiA9PT0gb3V0cHV0TWF4KSB7XG4gICAgcmV0dXJuIG91dHB1dE1pbjtcbiAgfVxuXG4gIGlmIChpbnB1dE1pbiA9PT0gaW5wdXRNYXgpIHtcbiAgICBpZiAodmFsdWUgPD0gaW5wdXRNaW4pIHtcbiAgICAgIHJldHVybiBvdXRwdXRNaW47XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXRNYXg7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIG91dHB1dE1pbiArXG4gICAgKChvdXRwdXRNYXggLSBvdXRwdXRNaW4pICogKHJlc3VsdCAtIGlucHV0TWluKSkgLyAoaW5wdXRNYXggLSBpbnB1dE1pbilcbiAgKTtcbn07XG5cbi8qKlxuICpcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyW119IGlucHV0UmFuZ2VcbiAqIEBwYXJhbSB7bnVtYmVyW119IG91dHB1dFJhbmdlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtjbGFtcD1mYWxzZV1cbiAqIEByZXR1cm4geyp9XG4gKi9cbmV4cG9ydCBjb25zdCBpbnRlcnBvbGF0ZUZyb21SYW5nZSA9IChcbiAgdmFsdWUsXG4gIGlucHV0UmFuZ2UsXG4gIG91dHB1dFJhbmdlLFxuICBjbGFtcCA9IGZhbHNlXG4pID0+IHtcbiAgY29uc3QgcmFuZ2VJbmRleCA9IGZpbmRSYW5nZUluZGV4KHZhbHVlLCBpbnB1dFJhbmdlKTtcbiAgcmV0dXJuIGludGVycG9sYXRlKFxuICAgIHZhbHVlLFxuICAgIGlucHV0UmFuZ2VbcmFuZ2VJbmRleF0sXG4gICAgaW5wdXRSYW5nZVtyYW5nZUluZGV4ICsgMV0sXG4gICAgb3V0cHV0UmFuZ2VbcmFuZ2VJbmRleF0sXG4gICAgb3V0cHV0UmFuZ2VbcmFuZ2VJbmRleCArIDFdLFxuICAgIGNsYW1wXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RWxlbWVudFNlZW5QZXJjZW50YWdlID0gKGVsZW1lbnQsIGlzVmVydGljYWwgPSB0cnVlKSA9PiB7XG4gIGNvbnN0IHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIGlmIChpc1ZlcnRpY2FsKSB7XG4gICAgcmV0dXJuIGludGVycG9sYXRlKFxuICAgICAgcmVjdC50b3AsXG4gICAgICAtcmVjdC5oZWlnaHQsXG4gICAgICB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgICAxMDAsXG4gICAgICAwLFxuICAgICAgdHJ1ZVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGludGVycG9sYXRlKHJlY3QubGVmdCwgLXJlY3Qud2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoLCAxMDAsIDAsIHRydWUpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZmluZFJhbmdlSW5kZXggPSAodmFsdWUsIHJhbmdlcykgPT4ge1xuICBsZXQgaW5kZXg7XG4gIGZvciAoaW5kZXggPSAxOyBpbmRleCA8IHJhbmdlcy5sZW5ndGggLSAxOyBpbmRleCsrKSB7XG4gICAgaWYgKHJhbmdlc1tpbmRleF0gPj0gdmFsdWUpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaW5kZXggLSAxO1xufTtcblxuY29uc3QgZml4SG91cnMgPSAoaG91cnMpID0+IChob3VycyA8IDEwID8gXCIwXCIgKyBob3VycyA6IGhvdXJzKTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdERhdGUgPSAoZGF0ZSwgZm9ybWF0KSA9PiB7XG4gIGlmICghZGF0ZSB8fCAhZm9ybWF0KSByZXR1cm4gXCJcIjtcblxuICBjb25zdCBkID0gbmV3IERhdGUoZGF0ZSk7XG5cbiAgY29uc3QgZGF5ID0gZC5nZXREYXRlKCk7XG4gIGNvbnN0IG1vbnRoID0gZC5nZXRNb250aCgpICsgMTtcbiAgY29uc3QgbW9udGhOYW1lID0gbW9udGhOYW1lc1ttb250aCAtIDFdO1xuICBjb25zdCB5ZWFyID0gZC5nZXRGdWxsWWVhcigpO1xuICBjb25zdCBtaW5ZZWFyID0geWVhci50b1N0cmluZygpLnN1YnN0cmluZygyLCA0KTtcbiAgY29uc3QgaG91cnMgPSBmaXhIb3VycyhkLmdldEhvdXJzKCkpO1xuICBjb25zdCBtaW51dGVzID0gZml4SG91cnMoZC5nZXRNaW51dGVzKCkpO1xuICBjb25zdCBzZWNvbmRzID0gZml4SG91cnMoZC5nZXRTZWNvbmRzKCkpO1xuXG4gIHJldHVybiBmb3JtYXRcbiAgICAucmVwbGFjZUFsbChcImRkXCIsIGRheSlcbiAgICAucmVwbGFjZUFsbChcIk1NTU1cIiwgbW9udGhOYW1lKVxuICAgIC5yZXBsYWNlQWxsKFwiTU1cIiwgbW9udGgpXG4gICAgLnJlcGxhY2VBbGwoXCJ5eXl5XCIsIHllYXIpXG4gICAgLnJlcGxhY2VBbGwoXCJ5eVwiLCBtaW5ZZWFyKVxuICAgIC5yZXBsYWNlQWxsKFwiaGhcIiwgaG91cnMpXG4gICAgLnJlcGxhY2VBbGwoXCJtbVwiLCBtaW51dGVzKVxuICAgIC5yZXBsYWNlQWxsKFwic3NcIiwgc2Vjb25kcyk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSAoa2V5KSA9PiB7XG4gIGNvbnN0IG1hdGNoZXMgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLm1hdGNoKGAke2tleX09KFtcXFxcU10rKSg/OiZ8JClgKTtcbiAgaWYgKG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPj0gMikgcmV0dXJuIG1hdGNoZXNbMV07XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgY29uc3QgU0NSRUVOX1RZUEUgPSB7XG4gIG1vYmlsZTogNjAwLFxuICB0YWJsZXRfcG9ydDogOTk2LjgsXG4gIHRhYmxldF9sYW5kOiAxMjAwLFxuICBkZXNrdG9wOiA5OTk5LFxufTtcblxuLyoqXG4gKiBAcGFyYW0gIHsobGlzdGVuZXIpPT57bGlzdGVuZXJzLnB1c2gobGlzdGVuZXJ9ID0+e2xldGxpc3RlbmVycz1bXTtyZXR1cm57c3Vic2NyaWJlXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVPYnNlcnZlciA9ICgpID0+IHtcbiAgbGV0IGxpc3RlbmVycyA9IFtdO1xuXG4gIHJldHVybiB7XG4gICAgc3Vic2NyaWJlOiAobGlzdGVuZXIpID0+IHtcbiAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLmZpbHRlcigobCkgPT4gbCAhPT0gbGlzdGVuZXIpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIHB1Ymxpc2g6IChldmVudCkgPT4ge1xuICAgICAgbGlzdGVuZXJzLmZvckVhY2goKGwpID0+IGwoZXZlbnQpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHJlZ2lvbklkVG9TdmdOYW1lID0ge1xuICAxOiBcInZpbmhvLXZlcmRlXCIsXG4gIDI6IFwidHJhcy1vcy1tb250ZXNcIixcbiAgMzogXCJwb3J0by1lLWRvdXJvXCIsXG4gIDQ6IFwidGF2b3JhLWUtdmFyb3NhXCIsXG4gIDU6IFwiZGFvXCIsXG4gIDY6IFwiYmFpcnJhZGFcIixcbiAgNzogXCJiZWlyYS1pbnRlcmlvclwiLFxuICA4OiBcImxpc2JvYVwiLFxuICA5OiBcInRlam9cIixcbiAgMTA6IFwic2V0dWJhbFwiLFxuICAxMTogXCJhbGVudGVqb1wiLFxuICAxMjogXCJhbGdhcnZlXCIsXG4gIDEzOiBcIm1hZGVpcmFcIixcbiAgMTQ6IFwiYWNvcmVzXCIsXG59O1xuIiwiZnVuY3Rpb24gX2NsYXNzQXBwbHlEZXNjcmlwdG9yR2V0KHJlY2VpdmVyLCBkZXNjcmlwdG9yKSB7XG4gIGlmIChkZXNjcmlwdG9yLmdldCkge1xuICAgIHJldHVybiBkZXNjcmlwdG9yLmdldC5jYWxsKHJlY2VpdmVyKTtcbiAgfVxuXG4gIHJldHVybiBkZXNjcmlwdG9yLnZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0FwcGx5RGVzY3JpcHRvckdldDtcbm1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjaztcbm1vZHVsZS5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IG1vZHVsZS5leHBvcnRzLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJmdW5jdGlvbiBfY2xhc3NFeHRyYWN0RmllbGREZXNjcmlwdG9yKHJlY2VpdmVyLCBwcml2YXRlTWFwLCBhY3Rpb24pIHtcbiAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIFwiICsgYWN0aW9uICsgXCIgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XG4gIH1cblxuICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0V4dHJhY3RGaWVsZERlc2NyaXB0b3I7XG5tb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwidmFyIGNsYXNzQXBwbHlEZXNjcmlwdG9yR2V0ID0gcmVxdWlyZShcIi4vY2xhc3NBcHBseURlc2NyaXB0b3JHZXQuanNcIik7XG5cbnZhciBjbGFzc0V4dHJhY3RGaWVsZERlc2NyaXB0b3IgPSByZXF1aXJlKFwiLi9jbGFzc0V4dHJhY3RGaWVsZERlc2NyaXB0b3IuanNcIik7XG5cbmZ1bmN0aW9uIF9jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xuICB2YXIgZGVzY3JpcHRvciA9IGNsYXNzRXh0cmFjdEZpZWxkRGVzY3JpcHRvcihyZWNlaXZlciwgcHJpdmF0ZU1hcCwgXCJnZXRcIik7XG4gIHJldHVybiBjbGFzc0FwcGx5RGVzY3JpcHRvckdldChyZWNlaXZlciwgZGVzY3JpcHRvcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NsYXNzUHJpdmF0ZUZpZWxkR2V0O1xubW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY3JlYXRlQ2xhc3M7XG5tb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBtb2R1bGUuZXhwb3J0cywgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7Il19
