import { type } from "os";

interface NotificationProps {
  title: String;
  source: String;
  color: String;
}

const Notification: React.FC<NotificationProps> = ({
  title,
  source,
  color,
}) => {
  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 z-30 flex px-4 py-6 pointer-events-none sm:p-6 mt-16"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        {/* <div id="hideMe" className="max-w-sm w-full bg-[url('https://storage.googleapis.com/polkastarter-production-assets/jiq12ptcg86gphxhluu1b69sp33q')] rounded-xl pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium">{ title }</p>
              <p className="mt-1 text-sm text-gray-300">{ source }
                file.</p>
            </div>
          </div>
        </div>
      </div> */}

        <div
          id="hideMe"
          className={`max-w-sm w-full rounded-xl pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ${color}`}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium">{title}</p>
                <p className="mt-1 text-sm text-gray-300">{source}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
