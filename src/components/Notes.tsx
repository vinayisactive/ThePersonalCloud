"use client";
import React, { useState } from "react";
import notesIcon from "../../public/assets/notes.svg";
import Image from "next/image";
import { trpc } from "@/app/_trpc/client";
import writeIcon from "../../public/assets/write.png";
import saveIcon from "../../public/assets/save.png";
import deleteIcon from "../../public/assets/delete.svg";
import { createContext } from "@/server/context";


const Notes = () => {
  const [inputStatus, setInputStatus] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const utils = trpc.useUtils();
  const notes = trpc.note.getNotes.useQuery();

  const noteMutation = trpc.note.createNote.useMutation({
    onSuccess: () => {
      utils.note.getNotes.invalidate();
    },
  });

  const deleteNoteMutation = trpc.note.deleteNote.useMutation({
    onSuccess: () => {
      utils.note.getNotes.invalidate();
    },
  });


  const { data, isLoading, error, isFetching }: any = notes;
  const allNotes = data?.data;

  return (
    <div className="w-full h-full flex flex-col justify-start items-start">
      <div className="h-16 w-full rounded-tr-3xl rounded-tl-3xl flex justify-between px-4 pr-2 bg-[#e5eff9]">
        <div className="flex justify-center items-center gap-3">
          <Image src={notesIcon} alt="notesIcon" width={40} height={40} />

          <div className="flex flex-col justify-start items-start">
            <p className="text-2xl font-bold">Notes</p>
            <div className="text-sm -mt-1">All icloud</div>
          </div>
        </div>

        <button
          onClick={() => setInputStatus(!inputStatus)}
          className="rounded-md pr-4"
        >
          <Image src={writeIcon} alt="write" width={30} height={30} />
        </button>
      </div>

      <div className=" w-full h-full flex flex-col rounded-br-3xl rounded-bl-3xl overflow-hidden">
        <div className=" w-full h-full flex justify-center items-center overflow-hidden">
          {isFetching ? (
            <div>Loading notes...</div>
          ) : error ? (
            <div className="w-full h-full flex justify-center items-center">
              {error.message}
            </div>
          ) : (
            <div className=" w-full h-full">
              {allNotes?.length ? (
                <div className="w-full h-full flex flex-col gap-2 overflow-y-scroll pl-16 pr-4 pt-2">
                  {allNotes?.map(
                    (note: { note: string; id: number; createdAt: string }) => {
                      return (
                        <div
                          key={note.id}
                          className="w-full flex  justify-between items-start border-b border-black/20"
                        >
                          <div className="flex flex-col justify-start items-start">
                            <p className="text-black">- {note.note}</p>
                            <p>{note.createdAt?.split("T").at(0)}</p>
                          </div>

                          <button
                            onClick={async () => {
                              deleteNoteMutation.mutateAsync({ id: note.id });
                              await notes.refetch();
                            }}
                          >
                            <Image
                              src={deleteIcon}
                              alt="delete"
                              height={30}
                              width={30}
                            />
                          </button>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  Add note...
                </div>
              )}
            </div>
          )}
        </div>

        <div
          className={` w-full h-10 ${
            inputStatus ? "flex" : "hidden"
          } justify-center  items-center gap-2 px-2  rounded-md pl-16 border rounded-bl-3xl rounded-br-3xl  bg-slate-200`}
        >
          <input
            type="text"
            className="w-full px-2 focus:border-none active:border-none focus:outline-none active:outline-none border py-2 bg-slate-200 placeholder:text-black"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add note..."
            value={input}
          />
          <button
            className="w-8 h-8 text-sm shrink-0 rounded-full bg-yellow-500 text-black flex justify-center items-center cursor-pointer"
            onClick={async () => {
              if (input.length) {
                noteMutation.mutateAsync({ note: input });
                setInput("");
                await notes.refetch();
                setInputStatus(false);
                setInput("");
              }
            }}
          >
            <Image src={saveIcon} alt="Save" height={20} width={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notes;
