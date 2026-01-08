type CommentProps = {
  comment: {
    username: string;
    content: string;
    createdAt: string;
    id: number;
  };
};

export default function Comment({ comment: props }: CommentProps) {
  return (
    <div>
      <div className="flex justify-between">
        <div className="text-blue-400 opacity-75 brightness-95 font-semibold">
          {props.username}
        </div>
        <div className=" text-zinc-500 text-sm">
          {props.createdAt.slice(0, 10) + "   " + props.createdAt.slice(11, 19)}
        </div>
      </div>
      <div className="p-1">{props.content}</div>
      <div
        className="w-full h-px bg-blue-200 transform-gpu"
        style={{ height: "1px", willChange: "transform" }}
      />
    </div>
  );
}
