import { CrossSVG } from '@/icons/index';

function Hashtags() {
  //   const [tags, setTags] = useState([]);

  return (
    <div className="relative flex flex-col">
      <input
        id="tagIds"
        type="text"
        placeholder="Enter hashtags that best describe you"
        className="mb-3 h-[54px] w-full rounded-2xl border border-solid border-gray-B40 px-4 py-[22px] text-sm font-semibold text-black placeholder:font-medium"
      />
      <button
        className="absolute right-3 top-[17px] text-sm font-bold text-blue-B50"
        type="button"
      >
        + Add
      </button>
      <ul className="mb-4 flex flex-wrap gap-[6px] text-sm">
        <li className="flex items-center gap-[6px] rounded-3xl bg-blue-B50 px-3 py-[10px] text-white">
          Skills
          <button type="button" aria-label="delete-tag">
            <CrossSVG className="size-4 fill-white" />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Hashtags;
