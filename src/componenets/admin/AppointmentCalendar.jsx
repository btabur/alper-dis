import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from "@fullcalendar/core/locales-all";

const AppointmentCalendar = ({ appointments, onConfirm, onCancel }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = appointments.map((item) => ({
    id: item.id,
    title: `${item.user.name} - ${item.treatment}`,
    start: `${item.date}T${Array.isArray(item.hour) ? item.hour[0] : item.hour}`,
    end: `${item.date}T${
      Array.isArray(item.hour) ? item.hour[item.hour.length - 1] : item.hour
    }`,
    extendedProps: {
      note: item.not,
      isChecked: item.isChecked,
    },
  }));

  return (
    <div className="appointment-calendar-container relative">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locales={allLocales}
        locale="tr"
        firstDay={1}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        slotMinTime="08:00:00"  // Başlangıç saati 08:00
        slotMaxTime="18:30:00"  // Bitiş saati 18:30
        eventDidMount={(info) => {
          if (info.event.extendedProps.isChecked === false) {
            info.el.style.backgroundColor = "#ff4d4d";
            info.el.style.borderColor = "#ff4d4d";
            info.el.style.color = "white";
          }
        }}
        eventClick={(info) => {
          if (info.event.extendedProps.isChecked === false) {
            setSelectedEvent(info.event);
          }
        }}
      />

      {/* Dialog ekranı */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-xl">
            <h2 className="text-lg font-bold mb-4">Randevu Onayla / İptal Et</h2>
            <p className="mb-4">
              <strong>{selectedEvent.title}</strong> <br />
              Tarih: {selectedEvent.start.toLocaleDateString()} <br />
              Saat: {selectedEvent.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  onConfirm(selectedEvent.id);
                  setSelectedEvent(null);
                }}
              >
                Onayla
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  onCancel(selectedEvent.id);
                  setSelectedEvent(null);
                }}
              >
                Sil
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setSelectedEvent(null)}
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;
