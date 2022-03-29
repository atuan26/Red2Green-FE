import React from 'react'


class TelegramPost extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { channel, postID, width, dark, userPic } = this.props;
    // window.TelegramLoginWidget = {
    //   dataOnauth: (user) => dataOnauth(user),
    // };

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?18";
    script.setAttribute("data-telegram-post", `${channel}/${postID}`);
    script.setAttribute("data-width", width);
    if (userPic)
      script.setAttribute("data-userpic", 'true');
    if (dark)
      script.setAttribute("data-dark", '1');
    script.async = true;
    this.instance.appendChild(script);
  }

  render() {
    return (
      <div
        className={this.props.className}
        ref={(component) => {
          this.instance = component;
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
export default TelegramPost