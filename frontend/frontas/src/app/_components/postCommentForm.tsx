import MDEditor, { commands } from "@uiw/react-md-editor";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type CommentType = {
  username: string;
  content: string;
  postId: number;
};
type PropType = {
  postId: number;
};

export default function PostCommentForm({ postId }: PropType) {
  const [mdValue, setMdValue] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<CommentType>({
    defaultValues: {
      username: "",
      content: "",
      postId: postId,
    },
  });

  const onSubmit: SubmitHandler<CommentType> = async (data) => {
    const payload = { ...data, content: mdValue };
    console.log("POST PAYLOAD:", payload);
    await postPost(payload);
    reset();
    setMdValue("");
    window.location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ fontFamily: "EB Garamond, serif" }}
      className="w-11/12 border border-blue-200 text-zinc-800 p-4 space-y-4  rounded mt-2 "
    >
      {/* username */}
      <div>
        <label className="">Nazwa użytkownika:</label>
        <input
          className="border-blue-200 border rounded-xl p-1.5 w-full"
          {...register("username", { required: true })}
        />
      </div>

      {/* md editor */}
      <div data-color-mode="light">
        <label className="font-semibold"></label>
        <div className="border-blue-300 border rounded ">
          <MDEditor
            style={{ fontFamily: "EB Garamond, serif" }}
            value={mdValue}
            onChange={(val) => setMdValue(val || "")}
            visibleDragbar={false}
            preview="edit"
            height={340}
            commands={[
              commands.bold,
              commands.italic,
              commands.strikethrough,
              commands.hr,
              commands.image,
            ]}
            extraCommands={[commands.codeEdit, commands.codePreview]}
          />
        </div>
      </div>

      {/* submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-200 mx-6 text-zinc-800 px-4 py-2 rounded-2xl hover:bg-blue-300 hover:cursor-pointer text-lg"
      >
        {isSubmitting ? "Wysyłanie..." : "Dodaj komentarz"}
      </button>
    </form>
  );
}

async function postPost(data: CommentType) {
  const response = await axios.post(
    "http://localhost:8080/api/comments",
    data,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}
