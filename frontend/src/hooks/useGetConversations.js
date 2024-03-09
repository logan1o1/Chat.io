import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const  getConversations = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/users");
            const data = await res.json();

            if (data.success === false) {
                toast.error(data.message);
            }else{
                setConversation(data)
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    };
    getConversations();
  }, [])

  return { loading, conversation};
}

export default useGetConversations
