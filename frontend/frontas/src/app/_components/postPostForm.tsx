import MDEditor, { commands } from "@uiw/react-md-editor";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type CategoryType = {
  id: number;
  name: string;
};

type PostType = {
  username: string;
  title: string;
  content: string;
  category: {
    id: number;
  };
};

export default function PostPostForm() {
  const [mdValue, setMdValue] = useState<string>("");
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<PostType>({
    defaultValues: {
      username: "",
      title: "",
      content: "",
      category: { id: 0 },
    },
  });

  // Pobranie kategorii z API przy montowaniu komponentu
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get<CategoryType[]>(
          "http://localhost:8080/api/categories"
        );
        setCategories(response.data);
      } catch (err) {
        console.error("Błąd pobierania kategorii:", err);
      }
    }
    fetchCategories();
  }, []);

  const onSubmit: SubmitHandler<PostType> = async (data) => {
    const payload = { ...data, content: mdValue };
    console.log("POST PAYLOAD:", payload);
    await postPost(payload);
    reset();
    setMdValue("");
    window.location.reload();
  };

  const sortedCategories = [...categories].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

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

      {/* title */}
      <div>
        <label className="">Tytuł:</label>
        <input
          className="border-blue-200 border rounded-xl  p-1.5 w-full"
          {...register("title", { required: true })}
        />
      </div>

      {/* category */}
      <div>
        <label className="">Kategoria:</label>
        <select
          className="border-blue-300 border rounded-xl p-2 w-full"
          {...register("category.id", { valueAsNumber: true })}
        >
          <option value={0}>Wybierz kategorię</option>
          {sortedCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
            </option>
          ))}
        </select>
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
        {isSubmitting ? "Wysyłanie..." : "Dodaj wpis"}
      </button>
    </form>
  );
}

async function postPost(data: PostType) {
  const response = await axios.post("http://localhost:8080/api/posts", data, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}
