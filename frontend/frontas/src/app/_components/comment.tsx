type CommentProps = {
  comment: {
    username: string;
    content: string;
    CreatedAt: string;
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
        <div>{props.CreatedAt}</div>
      </div>
      <div className="p-1">{props.content}</div>
      <div
        className="w-full h-px bg-blue-200 transform-gpu"
        style={{ height: "1px", willChange: "transform" }}
      />
    </div>
  );
}
