var socket = null;

function connect() {

  if (socket !== null)
    return;

  socket = new WebSocket('ws://auditor.vpluseteam.com');

  socket.onopen = function () {
    console.log('open');
    //send();
  };

  socket.onmessage = function (e) {
    console.log('onmessage');

    var rMsg = JSON.parse(decodeURIComponent(e.data));

    if (rMsg.typeMsg == "parsePath") {
      uiRefresh(rMsg.player, rMsg.audit, rMsg.audit);
      if (rMsg.hh_exist) {
        $("#el_hh").removeClass("transition hidden");
        vm.f_save_hh = "Zagr " + vm.f_month_hidden;
      } else {
        $("#el_hh").addClass("transition hidden");
        vm.f_save_hh = '';
      }
    } else if (rMsg.typeMsg == "parseHH") {
      $('body')
        .toast({
          displayTime: 0,
          title: 'Готово! Файл(-ы) обрезан(-ы)!',
          message: 'Сохранено в ' + rMsg.a_data + "\nНажми, чтобы сообщение исчезло.\nВремя: " +
            rMsg.times.toFixed(2) + " сек.",
          class: 'success',
        });
    };

    $(".ui.main.basic.segment").removeClass("loading");
  };

  socket.onclose = function (e) {
    console.log('onclose');
    connect();
  };
}


function disconnect() {

  if (socket === null)
    return;

  socket.close();
  socket = null;
}

function send(msg) {
  if (socket !== null) {
    socket.send(
      msg
    );
    //disconnect();
  }

}

//connect();


/*var lg = {
  days: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
  monthsShort: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
  today: 'Сегодня',
}*/
var formatter = {
  date: function (date, settings) {
    if (!date) return '';
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return day + '.' + (month < 10 ? 0 : '') + month + '.' + year;
  }
}

  
function iDate(today) {
  $('#rangestart').calendar( 'set date', new Date(today.getFullYear(), today.getMonth(), 1) );
  var temp = today;
  today.setDate(today.getDate() +31);
  today.setDate(1);
  today.setDate(today.getDate() -1);
  $('#rangeend').calendar( 'set date', new Date(temp.getFullYear(), temp.getMonth(), today.getDate()) );
}



  var today = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  today.setDate(today.getDate() - 1);
  var sDate = new Date(today.getFullYear(), today.getMonth(), 1);
  var fDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

$('#rangestart').calendar({
  type: 'date',
  endCalendar: $('#rangeend'),
  initialDate: sDate,
  //formatter: formatter,
});

$('#rangeend').calendar({
  type: 'date',
  startCalendar: $('#rangestart'),
  initialDate: fDate,
  //formatter: formatter,
});
  
$('#month_year_calendar')
  .calendar({
    type: 'month',
    initialDate: sDate,
	onChange: (val)=> { iDate(val) },
  });

