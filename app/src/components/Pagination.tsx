import usePagination from "@mui/material/usePagination/usePagination";

type PaginationProps = {
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  count: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  page,
  onChange,
  count,
}) => {
  const { items } = usePagination({
    count,
    page,
    onChange,
  });

  return (
    <nav>
      <ul className="list-none flex gap-2 items-end">
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;
          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page" && selected) {
            children = (
              <button
                type="button"
                className="bg-zinc-900 text-white rounded-md p-2 border border-zinc-100"
                {...item}
              >
                {page}
              </button>
            );
          } else if (type === "page") {
            children = (
              <button
                type="button"
                className="bg-zinc-900 text-white rounded-md p-2"
                {...item}
              >
                {page}
              </button>
            );
          } else {
            children = (
              <button
                type="button"
                {...item}
                className="bg-zinc-900 text-white rounded-md p-2 disabled:bg-gray-600"
                disabled={
                  (type === "next" && page === count + 1) ||
                  (type === "previous" && page === 0)
                }
              >
                {type === "previous" ? "ᐊ" : "ᐅ"}
              </button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </ul>
    </nav>
  );
};
