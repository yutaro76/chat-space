$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
      `<div class="chat-main__message-list" data-message-id=${message.id}>
        <div class="message-info">
          <div class="message-info__name">
            ${message.user_name}
          </div>
          <div class="message-info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message">
          <p class="message__content">
            ${message.content}
          </p>
          <img class="message__image" src="${message.image}">
        </div>
      </div>`
    return html;
    } else {
      let html =
     `<div class="chat-main__message-list" data-message-id=${message.id}>
        <div class="message-info">
          <div class="message-info__name">
            ${message.user_name}
          </div>
          <div class="message-info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message">
          <p class="message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function(){
    let last_message_id = $('.chat-main__message-list:last').data("message-id")  || 0;
  
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0){
        let insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.message__field').append(insertHTML);
        $('.message__field').animate({ scrollTop: $('.message__field')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});