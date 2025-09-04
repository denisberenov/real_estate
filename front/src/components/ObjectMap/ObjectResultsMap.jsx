import { useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import DetailsModal from "../DetailsModal/DetailsModal";

// чтобы не было красной иконки вместо маркера
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function ObjectResultsMap({ items, onSearchClick }) {
  const [selectedObj, setSelectedObj] = useState(null);
  
  // фильтруем только валидные точки
  const validItems = (items || []).filter(
    (item) =>
      !isNaN(parseFloat(item.latitude)) && !isNaN(parseFloat(item.longitude))
  );

  if (validItems.length === 0) {
    return <p>No valid coordinates to display on map</p>;
  }

  const center = [
    parseFloat(validItems[0].latitude),
    parseFloat(validItems[0].longitude),
  ];

  return (
    <>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "500px", width: "80%", borderRadius: "8px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {validItems.map((item) => (
          <Marker
            key={item.id}
            position={[parseFloat(item.latitude), parseFloat(item.longitude)]}
            eventHandlers={{
              click: () => setSelectedObj(item),
            }}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
              {item.title}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      {selectedObj && (
        <DetailsModal
          obj={selectedObj}
          onClose={() => setSelectedObj(null)}
          onSearchClick={onSearchClick}
        />
      )}
    </>
  );
}
