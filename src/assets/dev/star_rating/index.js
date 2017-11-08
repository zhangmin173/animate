var Light = function(el,options) {
    let defaults = {
        num: 0,
        readOnly: false,
    }
    this.$el = $(el)
    this.$item = this.$el.find('.m-star-item')
    this.opts = options
}
Light.prototype = {
    init() {
        this.render()
        this.lightOn(this.opts.num)
        this.handle()
    },
    handle() {
        let _this = this
        this.$item.bind('mouseover',function() {
            _this.lightOn($(this).index() + 1)
        })
        this.$el.bind('mouseout',function() {
            _this.lightOn(_this.opts.num)
        })
        this.$item.on('click',function() { 
            if(_this.opts.readOnly == false) {
                _this.opts.num = $(this).index() - 0 + 1
                _this.lightOn(_this.opts.num)
            }
        })
    },
    render() {
        if(this.opts.readOnly) {
            this.$item.each(function(index) {
                $(this).addClass('un-active')
            })
        } else {
            this.$item.each(function(index) {
                $(this).removeClass('un-active')
            })
        }
    },
    lightOn(num) {
        let _this = this
        this.$item.each(function(index) {
            if(index < num) {
                $(this).addClass('active')
            } else {
                $(this).removeClass('active')
            }
        })
    }
}