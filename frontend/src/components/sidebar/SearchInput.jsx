import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

export default function SearchInput() {
  const [search, setSearch] = useState("");
  const {setSelectedConversation} = useConversation();
  const {conversations} = useGetConversations();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!search) return;
    if (search.length < 3) {
      return toast.error("Search term should be atleast 3 charecters");
    }

    const searchedConversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

    if (searchedConversation) {
      setSelectedConversation(searchedConversation);
      setSearch("");
    }else toast.error("No search results found");
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered rounded-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-circle bg-sky-500 text-white">
          <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
      </form>
    </div>
  );
}
