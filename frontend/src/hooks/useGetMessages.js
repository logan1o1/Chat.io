import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();

    useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/messages/${selectedConversation._id}`);
				const data = await res.json();
                // console.log(data);
				if (data.error) throw new Error(data.error);
				setMessages(data);
                // console.log(messages);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

    // useEffect(() => {
    //     if (messages.length > 0) {
    //         // console.log( messages);
    //     }
    // }, [messages]);

    return  { messages, loading };
}
export default useGetMessages;
