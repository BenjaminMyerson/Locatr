import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as topojson from "topojson-client";

export default function GlobeBackground() {
  const globeRef = useRef();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://unpkg.com/world-atlas@2/countries-110m.json")
      .then(res => res.json())
      .then(data => {
        const geo = topojson.feature(data, data.objects.countries);
        setCountries(geo.features);
      });
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;

    globeRef.current.pointOfView({ lat: 20, lng: 30, altitude: 2 });

    const controls = globeRef.current.controls();
    controls.autoRotate = true;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.autoRotateSpeed = 1;
  }, []);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 1
    }}>
      <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          nightLightsImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpScale={0}
          backgroundColor="rgba(0,0,0,0)"
          polygonsData={countries}
          polygonCapColor={() => "rgba(0,0,0,0)"}
          polygonSideColor={() => "rgba(0,0,0,0)"}
          polygonStrokeColor={() => "#000000"}
          polygonAltitude={0.001}
          atmosphereColor="lightskyblue"
          atmosphereAltitude={0.25}
          onGlobeClick={(coords) => console.log(coords)}
      />
    </div>
  );
}