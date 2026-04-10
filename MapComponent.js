import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapComponent({ routes, selectedRoute }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      // Initialize map
      mapInstanceRef.current = L.map(mapRef.current).setView([40.7128, -74.0060], 13); // Default to NYC

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);

      // Add safety overlay layer
      const safetyLayer = L.layerGroup().addTo(mapInstanceRef.current);

      // Add some sample safety markers (red for unsafe, green for safe)
      const unsafeAreas = [
        { lat: 40.7589, lng: -73.9851, type: 'unsafe', desc: 'Times Square - High traffic but safe' },
        { lat: 40.7505, lng: -73.9934, type: 'unsafe', desc: 'Penn Station area' },
        { lat: 40.7282, lng: -73.7949, type: 'safe', desc: 'Queens residential area' },
      ];

      unsafeAreas.forEach(area => {
        const color = area.type === 'unsafe' ? 'red' : 'green';
        const marker = L.circleMarker([area.lat, area.lng], {
          color: color,
          fillColor: color,
          fillOpacity: 0.3,
          radius: 15
        }).addTo(safetyLayer);

        marker.bindPopup(`<b>${area.type.toUpperCase()}</b><br>${area.desc}`);
      });
    }

    return () => {
      if (routingControlRef.current) {
        mapInstanceRef.current.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (routes && routes.length > 0 && mapInstanceRef.current) {
      // Clear existing routing
      if (routingControlRef.current) {
        mapInstanceRef.current.removeControl(routingControlRef.current);
      }

      // Add routing for the first (safest) route
      const route = routes[0];
      if (route.origin && route.destination) {
        // For demo purposes, using coordinates. In real app, you'd geocode addresses
        const originCoords = [40.7589, -73.9851]; // Times Square
        const destCoords = [40.7505, -73.9934]; // Penn Station

        routingControlRef.current = L.Routing.control({
          waypoints: [
            L.latLng(originCoords[0], originCoords[1]),
            L.latLng(destCoords[0], destCoords[1])
          ],
          routeWhileDragging: false,
          createMarker: (i, waypoint) => {
            const markerColor = i === 0 ? 'green' : 'red';
            return L.marker(waypoint.latLng, {
              icon: L.icon({
                iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${markerColor}.png`,
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
              })
            });
          }
        }).addTo(mapInstanceRef.current);

        // Add route info popup
        setTimeout(() => {
          const routeInfo = `
            <div style="font-family: Arial, sans-serif; max-width: 200px;">
              <h4 style="margin: 0 0 8px 0; color: #2c3e50;">Safe Route</h4>
              <p style="margin: 4px 0;"><strong>Safety Score:</strong> ${(route.safety_score * 100).toFixed(0)}%</p>
              <p style="margin: 4px 0;"><strong>Distance:</strong> ${route.distance || '12.5 km'}</p>
              <p style="margin: 4px 0;"><strong>Time:</strong> ${route.estimated_time || '18 min'}</p>
              <div style="background: ${route.safety_score > 0.7 ? '#4CAF50' : route.safety_score > 0.5 ? '#FF9800' : '#f44336'};
                          color: white; padding: 4px 8px; border-radius: 4px; display: inline-block; margin-top: 8px;">
                ${route.safety_score > 0.7 ? 'SAFE' : route.safety_score > 0.5 ? 'MODERATE' : 'AVOID'}
              </div>
            </div>
          `;

          // Add a popup to the route
          if (routingControlRef.current && routingControlRef.current._container) {
            L.popup()
              .setLatLng([(originCoords[0] + destCoords[0]) / 2, (originCoords[1] + destCoords[1]) / 2])
              .setContent(routeInfo)
              .openOn(mapInstanceRef.current);
          }
        }, 1000);
      }
    }
  }, [routes]);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        overflow: 'hidden'
      }}
    />
  );
}

export default MapComponent;
