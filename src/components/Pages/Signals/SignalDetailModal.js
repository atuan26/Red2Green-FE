import React from "react";
import ChartComponent from "../../Other/Chart/Chart2";
import { TelegramPost } from "../../Other/TelegramWidget";

const SignalDetailModal = ({ data }) => {
  return (
    <div className="flex gap-5 p-8">
      <div>
        <TelegramPost
          channel={data?.signals.channel.username}
          postID={data?.signals.post_id}
          userPic="true"
          width="320px"
          // dark='1'
        />
      </div>
      <div className="w-[900px]">
        <ChartComponent
          symbol={data?.symbol}
          exchange={data?.exchange}
          since={data?.signals.post_date}
          // width={900}
        />
      </div>
      <div className=" rounded-lg bg-slate-50 shadow-sm w-[300px] h-full">
        <ul className="p-6">
          <li>Sentiment: Positive 😟🙁😐🙂😊</li>
          <li>Category: Upgrade</li>
        </ul>
      </div>
    </div>
  );
};

export default SignalDetailModal;
