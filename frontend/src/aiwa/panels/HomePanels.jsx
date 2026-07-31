import { JournalPanel } from "./JournalPanel";
import { CalendarPanel } from "./CalendarPanel";

export function HomePanels({ panel, onClose, checkin, symptomGroups, mode, revision, dayIso }) {
  return (
    <>
      <JournalPanel isOpen={panel === "journal"} onClose={onClose} checkin={checkin} symptomGroups={symptomGroups} mode={mode} dayIso={dayIso} />
      <CalendarPanel isOpen={panel === "calendar"} onClose={onClose} mode={mode} revision={revision} symptomGroups={symptomGroups} />
    </>
  );
}
