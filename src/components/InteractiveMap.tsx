import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const InteractiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [error, setError] = useState('');

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    try {
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        zoom: 3,
        center: [-46.6333, -23.5505], // São Paulo coordinates
        pitch: 45,
        bearing: -17.6,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add location marker
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.innerHTML = `
        <div class="marker-pulse">
          <div class="marker-dot"></div>
        </div>
      `;

      new mapboxgl.Marker(el)
        .setLngLat([-46.6333, -23.5505])
        .addTo(map.current);

      // Add popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-3">
            <h3 class="font-semibold text-foreground mb-1">📍 São Paulo, SP</h3>
            <p class="text-sm text-muted-foreground">Disponível para projetos remotos e presenciais</p>
          </div>
        `);

      map.current.on('click', () => {
        popup.addTo(map.current!);
      });

      // Smooth rotation
      let userInteracting = false;

      const rotateCamera = (timestamp: number) => {
        if (!map.current || userInteracting) return;
        
        map.current.rotateTo((timestamp / 100) % 360, { duration: 0 });
        requestAnimationFrame(rotateCamera);
      };

      map.current.on('mousedown', () => { userInteracting = true; });
      map.current.on('mouseup', () => { 
        userInteracting = false; 
        requestAnimationFrame(rotateCamera);
      });

      // Start rotation
      requestAnimationFrame(rotateCamera);

      setShowTokenInput(false);
      setError('');
    } catch (err) {
      setError('Token inválido. Verifique se o token do Mapbox está correto.');
    }
  };

  const handleSubmitToken = () => {
    if (!mapboxToken.trim()) {
      setError('Por favor, insira um token do Mapbox válido.');
      return;
    }
    initializeMap(mapboxToken);
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden">
      {showTokenInput ? (
        <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm border border-primary/10 rounded-xl">
          <div className="max-w-md w-full p-6 space-y-4">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Configurar Mapa</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Para exibir o mapa interativo, insira seu token público do Mapbox
              </p>
            </div>
            
            {error && (
              <Alert className="border-destructive/20">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-3">
              <Input
                type="text"
                placeholder="pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="bg-background/50"
              />
              <Button 
                onClick={handleSubmitToken} 
                className="w-full bg-gradient-primary hover:opacity-90"
                disabled={!mapboxToken.trim()}
              >
                Carregar Mapa
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Obtenha seu token gratuito em{' '}
                <a 
                  href="https://mapbox.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  mapbox.com
                </a>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div ref={mapContainer} className="absolute inset-0" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/20 to-transparent" />
        </>
      )}
    </div>
  );
};

export default InteractiveMap;