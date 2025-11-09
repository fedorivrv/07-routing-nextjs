"use client";

import { useState } from "react";
import css from "../notes/page.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Loading from "@/components/Loader/Loader";
import Error from "@/components/ErrorMessege/ErrorMessege";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["notes", topic, page],
    queryFn: () => fetchNotes(topic, page),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const handleSearch = useDebouncedCallback((topic: string) => {
    setTopic(topic);
    setPage(1);
  }, 1000);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} searchQuery={topic} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data?.totalPages}
            currentPage={page}
            onPageChange={(page) => setPage(page)}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <Loading />}
      {isError && <Error message={String(error)} />}
      {data && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal}       
                    onSuccess={closeModal}   
          />  
        </Modal>
      )}
    </div>
  );
}