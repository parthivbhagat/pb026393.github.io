

var hovermenu = function(){
	$('.menu-content').hover(
	  function() {
	  	
	  }, function() {
	  	$(this).parent().removeClass('active');
	    $(this).hide();
	  }
	);
};


$(".menu").click (function(){
	if (!$(this).hasClass("disabled")){
		$(this).addClass('active');
		$(this).find('.menu-content').show();
		hovermenu();
	}
});


var countTabs = function(num){
	num = parseFloat(num);
	var totalTabs = $('.tab').length;
	if (parseFloat(num) == totalTabs){
		//num is last tab, show tab, 1st adn 2nd tab
		var num2 = (num - 1);
		var num3 = (num2 - 1);
		$('.tab').addClass('hide');
		$('.tab[tabId='+num+']').removeClass('hide');
		$('.tab[tabId='+num2+']').removeClass('hide');
		$('.tab[tabId='+num3+']').removeClass('hide');
		//disable right arrow
		$(".right-arrow").addClass('deactive');
		$(".left-arrow").removeClass('deactive').attr('target', (num3 - 1));

	}
	 else if ((parseFloat(num) + 2) > totalTabs){
		if ((parseFloat(num) + 1) <= totalTabs){
			//show tab, +1, -1
			var num2 = (num + 1);
			var num3 = (num - 1);
			$('.tab').addClass('hide');
			$('.tab[tabId='+num+']').removeClass('hide');
			$('.tab[tabId='+num2+']').removeClass('hide');
			$('.tab[tabId='+num3+']').removeClass('hide');
			//disable right arrow
			$(".right-arrow").addClass('deactive').attr('target', (num2));
			$(".left-arrow").removeClass('deactive').attr('target', (num3 - 1));
		}
	}
	else if ((parseFloat(num) + 2) <= totalTabs){
		//show num, +1, +1
		var num2 = (num + 1);
		var num3 = (num2 + 1);
		$('.tab').addClass('hide');
		$('.tab[tabId='+num+']').removeClass('hide');
		$('.tab[tabId='+num2+']').removeClass('hide');
		$('.tab[tabId='+num3+']').removeClass('hide');
		if (num == 1){
			//disable left arrow
			$(".right-arrow").removeClass('deactive').attr('target', (num2));
			$(".left-arrow").addClass('deactive').attr('target', (num));
		}
		if (num > 1 && num < totalTabs){
			$(".right-arrow").removeClass('deactive').attr('target', (num + 1));
			$(".left-arrow").removeClass('deactive').attr('target', (num - 1));
		}
	}
}

$(".left-arrow").click (function(){
	if (!$(this).hasClass("deactive")){
		var thisTID = $(this).attr('target');
		countTabs(thisTID);
	}
});
$(".right-arrow").click (function(){
	if (!$(this).hasClass("deactive")){
		var thisTID = $(this).attr('target');
		countTabs(thisTID);
	}
});

$("#mPage-tab-cont").on( "click", ".tab", function() {
	if (!$(this).hasClass('active')){
		var contID = $(this).attr('content');
		lastOpened = $(".tab.active").attr('tabId');
		$(".tab").removeClass('active');
		activeTab = $(this).attr('tabId');
		$(this).addClass('active');
		$(".image-content").hide();
		$("#"+contID).css('display', 'inline-block');
	}
});
$(".all-tabs-dd").on( "click", ".all-tab-item", function() {
	var contID = $(this).attr('content');
	var thisTID = $(this).attr('tabId');
	lastOpened = $(".tab.active").attr('tabId');
	$(".tab").removeClass('active');
	activeTab = thisTID;
    $('.tab[tabId='+thisTID+']').addClass('active');
	$(".image-content").hide();
	$("#"+contID).css('display', 'inline-block');
	countTabs(thisTID);
	return false;
});
$('.add-new-tab').on( "click", function() {
	var thisTID = String(tabArr.length +1)
	var newItem = [];
	newItem.push({
		content: $(this).attr('content'),
		label: $(this).attr('label'),
		tabId: thisTID
	});
	openTabs.splice(2,1, newItem[0]);
	lastOpened = $(".tab.active").attr('tabId');
	activeTab = thisTID;
	var tabHTML ='<div class="tab active" tabId="'+openTabs[2].tabId+'" content="'+openTabs[2].content+'" label="'+openTabs[2].label+'">'+openTabs[2].label+'<span class="close"></span></div>'
	if ($(".placeholder").length){
		$(".placeholder").replaceWith(tabHTML);
	}
	else {
		$(".tab.active").after(tabHTML);
		$(".tab[tabId='"+lastOpened+"']").removeClass('active');
		countTabs(thisTID);
	}

	tabArr.push(newItem[0]);
	$(".all-tabs-dd").append('</br><a href="#" class="all-tab-item" tabId="'+openTabs[2].tabId+'" content="'+openTabs[2].content+'" label="'+openTabs[2].label+'">'+openTabs[2].label+'</a>');

	$("#cont-add").hide();
	$(".image-content").hide();
	$("#"+openTabs[2].content).css('display', 'inline-block');
});

$('.insert-tab').on( "click", function() {
	var thisTID = String(4)
	var newItem = [];
	newItem.push({
		content: $(this).attr('content'),
		label: $(this).attr('label'),
		tabId: thisTID
	});
	openTabs.splice(2,1, newItem[0]);
	lastOpened = $(".tab.active").attr('tabId');
	activeTab = thisTID;
	$(".tab[tabId='5']").attr('tabId', '6');
	$(".tab[tabId='4']").attr('tabId', '5');
	$(".all-tab-item[tabId='5']").attr('tabId', '6');
	$(".all-tab-item[tabId='4']").attr('tabId', '5');
	var tabHTML ='<div class="tab active" tabId="'+openTabs[2].tabId+'" content="'+openTabs[2].content+'" label="'+openTabs[2].label+'">'+openTabs[2].label+'<span class="close"></span></div>'

	$(".tab.active").after(tabHTML);
	$(".tab[tabId='"+lastOpened+"']").removeClass('active');
	countTabs(3);

	tabArr.push(newItem[0]);
	$(".all-tabs-dd").append('</br><a href="#" class="all-tab-item" tabId="'+openTabs[2].tabId+'" content="'+openTabs[2].content+'" label="'+openTabs[2].label+'">'+openTabs[2].label+'</a>');

	$("#cont-add").hide();
	$(".image-content").hide();
	$("#"+openTabs[2].content).css('display', 'inline-block');
});

$(".all-tabs").hover(
  function() {
  	$(this).addClass('active');
   $(".all-tabs-dd").show();
  }, function() {
  	$(this).removeClass('active');
    $(".all-tabs-dd").hide();
  }
);

$(".add-tab").click (function(){
	var thisTID = String(tabArr.length +1)
	$(".image-content").hide();
	$("#cont-add").show();
	$(".tab").removeClass('active');
	$("#tab-cont").append('<div class="tab placeholder active" tabId="'+thisTID+'">New View<span class="close"></span></div>');
	countTabs(thisTID);
})
