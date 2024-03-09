import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";

export default function Conversations() {
  const { loading, conversation } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversation.map((conversation, index) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={index === conversation.length - 1}
          />
        ))}
		{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  );
}
