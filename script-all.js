/*!
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2013 Brian Cherne
 */
 
/* hoverIntent is similar to jQuery's built-in "hover" method except that
 * instead of firing the handlerIn function immediately, hoverIntent checks
 * to see if the user's mouse has slowed down (beneath the sensitivity
 * threshold) before firing the event. The handlerOut function is only
 * called after a matching handlerIn.
 *
 * // basic usage ... just like .hover()
 * .hoverIntent( handlerIn, handlerOut )
 * .hoverIntent( handlerInOut )
 *
 * // basic usage ... with event delegation!
 * .hoverIntent( handlerIn, handlerOut, selector )
 * .hoverIntent( handlerInOut, selector )
 *
 * // using a basic configuration object
 * .hoverIntent( config )
 *
 * @param  handlerIn   function OR configuration object
 * @param  handlerOut  function OR selector for delegation OR undefined
 * @param  selector    selector OR undefined
 * @author Brian Cherne <brian(at)cherne(dot)net>
 */
(function($) {
    $.fn.hoverIntent = function(handlerIn,handlerOut,selector) {

        // default configuration values
        var cfg = {
            interval: 100,
            sensitivity: 7,
            timeout: 0
        };

        if ( typeof handlerIn === "object" ) {
            cfg = $.extend(cfg, handlerIn );
        } else if ($.isFunction(handlerOut)) {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerOut, selector: selector } );
        } else {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut } );
        }

        // instantiate variables
        // cX, cY = current X and Y position of mouse, updated by mousemove event
        // pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
        var cX, cY, pX, pY;

        // A private function for getting mouse position
        var track = function(ev) {
            cX = ev.pageX;
            cY = ev.pageY;
        };

        // A private function for comparing current and previous mouse position
        var compare = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            // compare mouse positions to see if they've crossed the threshold
            if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
                $(ob).off("mousemove.hoverIntent",track);
                // set hoverIntent state to true (so mouseOut can be called)
                ob.hoverIntent_s = 1;
                return cfg.over.apply(ob,[ev]);
            } else {
                // set previous coordinates for next time
                pX = cX; pY = cY;
                // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
                ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
            }
        };

        // A private function for delaying the mouseOut function
        var delay = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = 0;
            return cfg.out.apply(ob,[ev]);
        };

        // A private function for handling mouse 'hovering'
        var handleHover = function(e) {
            // copy objects to be passed into t (required for event object to be passed in IE)
            var ev = jQuery.extend({},e);
            var ob = this;

            // cancel hoverIntent timer if it exists
            if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

            // if e.type == "mouseenter"
            if (e.type == "mouseenter") {
                // set "previous" X and Y position based on initial entry point
                pX = ev.pageX; pY = ev.pageY;
                // update "current" X and Y position based on mousemove
                $(ob).on("mousemove.hoverIntent",track);
                // start polling interval (self-calling timeout) to compare mouse coordinates over time
                if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

                // else e.type == "mouseleave"
            } else {
                // unbind expensive mousemove event
                $(ob).off("mousemove.hoverIntent",track);
                // if hoverIntent state is true, then call the mouseOut function after the specified delay
                if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
            }
        };

        // listen for mouseenter and mouseleave
        return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover}, cfg.selector);
    };

//галлерея... подключила - вроде, работает
//(function($) {$("a.gallery").fancybox()}; 


$("#slides").slides({
responsive: true});

$('#s-menu > li > ul').hide().click(function(e){e.stopPropagation();});


// Раскрываине меню

$('#s-menu > li').hoverIntent(
function(){
$(this).find('ul').slideDown();
},
function(){
//$(this).find('ul').slideUp(2000);
});

$("#s-menu").mouseleave(function(){
$(this).find('ul').slideUp(2000);
//alert();
});


/*

$('#s-menu > li').hoverIntent(
function(){
$(this).find('ul').slideDown();
},
function(){
$(this).find('ul').slideUp(2000);
});

*/


//Окрашиваем таблицу и применяем разные стили
$("#item_container tr:nth-child(2n)").addClass("color_string");
$("#scroll table tr:nth-child(2n)").addClass("color_string");
$("#scroll tr td:first-child").addClass("first_cell");
$("#scroll tr td:first-child").addClass("first_cell");
$("#scroll table tr:first-child").find("td").addClass("nothing_square");
$("#scroll table tr:nth-child(2), table tr:nth-child(7), table tr:nth-child(8), table tr:nth-child(9), table tr:nth-child(13), table tr:nth-child(16)").find("td").addClass("text_bold");

//Проверим если это страничка с формой заявки добавим к блоку content отступ с низу - так проще

//alert(document.getElementById("order-form"));


if(document.getElementById("order-form")){
$("content").css("padding-bottom","10px");
};


//Помещаем в форму placeholder и устанавливаем максимальную длину вводимого текста (так положено)

$(".wrap-shape input[type=text]").attr("maxlength","20");
$(".wrap-shape textarea").attr("maxlength","50");
$(".wrap-shape #OrderForm_phoneNumber").attr("placeholder","  Заполните обязательно");

//$(".general_delivery").hide();
$("#more_fill").click(function(){
$(".general_delivery").show();
$(this).hide();
$(".privilege").hide();
});


//Модальное окно при оттпрафки формы 

//$("input[name='yt0']").modal();
//$("#myModal").modal();
//$('#myModal').click(function(){$(this).modal('toggle')});
//$('#myModal').modal('show');
//$('#myModal').on('show');
//$('#myModal').on('show', function () {alert();})
//(function () {$('#myModal').modal('show'); };);
/*
$('#myModal').modal({
          show: false
        });


$('#myModal').click(function(){
            $('#myModal').modal('toggle');
            return false;
        });
	
	
$('#myModal').on('hidden', function () {
            $('#myModal').modal('toggle');
})

*/
$("#order-form").submit(function(){
//$("input[name='yt0']").attr("data-toggle","modal").attr("data-target","#myModal");
$("#myModal").modal();
});


//data-toggle="modal" data-target="#myModal"
	
})(jQuery);



// Еще один комментарий

/* 
function sh1() {
   nextText = document.getElementById("nexttext");
   more = document.getElementById("more");
   if( nextText.style.display == "none" ) { nextText.style.display = "inline"; more.innerHTML='';} else { nextText.style.display = "none"; more.innerHTML='Подробнее';}
 };
*/