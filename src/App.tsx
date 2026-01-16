import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Slider } from "./components/ui/slider";
import { ChevronLeft, ArrowUpDown } from "lucide-react";
import { useState } from "react";

// Mock product data
const products = [
  { id: 1, model: "1522", manufacturer: "Silicon Designs Inc.", applications: ["general"], technology: "MEMS", standards: "Industrial", axis: "1", gRange: "2g", biasInrun: "12µg", temperature: -40, shock: 500 },
  { id: 2, model: "1522", manufacturer: "Silicon Designs Inc.", applications: ["defense", "general", "aerospace"], technology: "MEMS", standards: "Industrial", axis: "1", gRange: "5g", biasInrun: "12µg", temperature: -40, shock: 1000 },
  { id: 3, model: "1522", manufacturer: "Silicon Designs Inc.", applications: ["defense", "general", "aircraft", "aerospace"], technology: "MEMS", standards: "Industrial", axis: "1", gRange: "10g", biasInrun: "30µg", temperature: -40, shock: 1500 },
  { id: 4, model: "1522", manufacturer: "Silicon Designs Inc.", applications: ["defense", "general", "aircraft", "aerospace"], technology: "MEMS", standards: "Industrial", axis: "1", gRange: "25g", biasInrun: "60µg", temperature: -20, shock: 1000 },
  { id: 5, model: "1522", manufacturer: "Silicon Designs Inc.", applications: ["defense", "general", "aircraft", "vtol", "aerospace"], technology: "MEMS", standards: "Industrial", axis: "1", gRange: "50g", biasInrun: "60µg", temperature: 0, shock: 1500 },
  { id: 6, model: "1522", manufacturer: "Silicon Designs Inc.", applications: ["defense", "space", "aerospace"], technology: "MEMS", standards: "Industrial", axis: "1", gRange: "100g", biasInrun: "60µg", temperature: 25, shock: 2000 },
  { id: 7, model: "1522", manufacturer: "Silicon Designs Inc.", applications: ["defense", "space", "launcher", "aerospace"], technology: "MEMS", standards: "Industrial", axis: "1", gRange: "200g", biasInrun: "60µg", temperature: 85, shock: 2000 },
  { id: 8, model: "1522", manufacturer: "Silicon Designs Inc.", applications: ["defense", "space", "launcher", "aerospace"], technology: "MEMS", standards: "Industrial", axis: "1", gRange: "400g", biasInrun: "60µg", temperature: 100, shock: 1800 },
  { id: 9, model: "2227", manufacturer: "Silicon Designs Inc.", applications: ["defense", "aircraft", "vtol", "aerospace"], technology: "MEMS", standards: "Industrial", axis: "1", gRange: "10g", biasInrun: "12µg", temperature: -40, shock: 1200 },
];

const filterCategories = [
  "Accelerometer",
  "ADAHRS",
  "AHRS",
  "Antenna",
  "Airspeed",
  "GPS Receiver",
  "Gyroscopes",
  "IMU",
  "Magnetometer",
  "Operating System",
  "Startracker",
];

export default function App() {
  const [gRangeFilter, setGRangeFilter] = useState([0, 500]);
  const [biasFilter, setBiasFilter] = useState([0, 100]);
  const [temperatureFilter, setTemperatureFilter] = useState([-50, 125]);
  const [shockFilter, setShockFilter] = useState([100, 2000]);
  const [applicationFilter, setApplicationFilter] = useState<string>("all");

  // Parse numeric values from strings like "10g" or "12µg"
  const parseGRange = (value: string) => parseInt(value.replace('g', ''));
  const parseBias = (value: string) => parseInt(value.replace('µg', ''));

  // Filter products based on slider values and application
  const filteredProducts = products.filter((product) => {
    const gRange = parseGRange(product.gRange);
    const bias = parseBias(product.biasInrun);
    const matchesSliders = gRange >= gRangeFilter[0] && gRange <= gRangeFilter[1] &&
           bias >= biasFilter[0] && bias <= biasFilter[1] &&
           product.temperature >= temperatureFilter[0] && product.temperature <= temperatureFilter[1] &&
           product.shock >= shockFilter[0] && product.shock <= shockFilter[1];
    
    const matchesApplication = applicationFilter === "all" || 
           product.applications.some(app => app.toLowerCase() === applicationFilter.toLowerCase());
    
    return matchesSliders && matchesApplication;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar with Sliders */}
      <div className="w-80 bg-white border-r p-6 space-y-8">
        <div>
          <h3 className="mb-4">Filters</h3>
          
          {/* Application Radio Buttons */}
          <div className="space-y-3 mb-8">
            <label className="text-sm font-medium">
              Application
            </label>
            <div className="space-y-2">
              {["All", "Aircraft", "Defense", "Space", "VTOL"].map((app) => (
                <label key={app} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="application"
                    value={app.toLowerCase()}
                    checked={applicationFilter === app.toLowerCase()}
                    onChange={(e) => setApplicationFilter(e.target.value)}
                    className="w-4 h-4 text-blue-600 cursor-pointer"
                  />
                  <span className="text-sm">{app}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* G Range Slider */}
          <div className="space-y-3">
            <label className="text-sm">
              G Range
            </label>
            <Slider
              value={gRangeFilter}
              onValueChange={setGRangeFilter}
              min={0}
              max={500}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0g</span>
              <span>500g</span>
            </div>
          </div>

          {/* Bias Inrun Slider */}
          <div className="space-y-3 mt-8">
            <label className="text-sm">
              Bias Inrun
            </label>
            <Slider
              value={biasFilter}
              onValueChange={setBiasFilter}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0µg</span>
              <span>100µg</span>
            </div>
          </div>

          {/* Temperature Slider */}
          <div className="space-y-3 mt-8">
            <label className="text-sm">
              Temperature
            </label>
            <Slider
              value={temperatureFilter}
              onValueChange={setTemperatureFilter}
              min={-50}
              max={125}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>-50°C</span>
              <span>125°C</span>
            </div>
          </div>

          {/* Shock Slider */}
          <div className="space-y-3 mt-8">
            <label className="text-sm">
              Shock
            </label>
            <Slider
              value={shockFilter}
              onValueChange={setShockFilter}
              min={100}
              max={2000}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>100g</span>
              <span>2000g</span>
            </div>
          </div>

          {/* Reset Button */}
          <Button
            variant="outline"
            className="w-full mt-6"
            onClick={() => {
              setGRangeFilter([0, 500]);
              setBiasFilter([0, 100]);
              setTemperatureFilter([-50, 125]);
              setShockFilter([100, 2000]);
              setApplicationFilter("all");
            }}
          >
            Reset Filters
          </Button>

          {/* Results Count */}
          <div className="mt-6 p-3 bg-blue-50 rounded text-sm">
            <span className="font-medium">{filteredProducts.length}</span> products match your filters
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <button className="flex items-center gap-1 text-blue-600 text-sm mb-4">
            <ChevronLeft className="size-4" />
            Back
          </button>
          <h1 className="mb-6">Explore products</h1>
          
          {/* Filters */}
          <div className="mb-4">
            <p className="text-sm mb-3">Showing components for</p>
            <div className="flex flex-wrap gap-2">
              {filterCategories.map((category, index) => (
                <Badge
                  key={category}
                  variant={index === 0 ? "default" : "secondary"}
                  className={index === 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700">
            Refine results
          </Button>
        </div>

        {/* Table */}
        <div className="p-6">
          <Card>
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="grid grid-cols-[80px_200px_300px_120px_120px_80px_100px_100px] gap-4 p-4 bg-gray-50 border-b text-sm">
                <button className="flex items-center gap-1 justify-start hover:text-gray-900">
                  Model
                  <ArrowUpDown className="size-3" />
                </button>
                <button className="flex items-center gap-1 justify-start hover:text-gray-900">
                  Manufacturer
                  <ArrowUpDown className="size-3" />
                </button>
                <button className="flex items-center gap-1 justify-start hover:text-gray-900">
                  Applications
                  <ArrowUpDown className="size-3" />
                </button>
                <button className="flex items-center gap-1 justify-start hover:text-gray-900">
                  Technology
                  <ArrowUpDown className="size-3" />
                </button>
                <button className="flex items-center gap-1 justify-start hover:text-gray-900">
                  Standards
                  <ArrowUpDown className="size-3" />
                </button>
                <button className="flex items-center gap-1 justify-start hover:text-gray-900">
                  Axis
                  <ArrowUpDown className="size-3" />
                </button>
                <button className="flex items-center gap-1 justify-start hover:text-gray-900">
                  G range
                  <ArrowUpDown className="size-3" />
                </button>
                <button className="flex items-center gap-1 justify-start hover:text-gray-900">
                  Bias inrun
                  <ArrowUpDown className="size-3" />
                </button>
              </div>

              {/* Table Rows with Orange Grid Lines */}
              <div className="divide-y divide-orange-500">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="grid grid-cols-[80px_200px_300px_120px_120px_80px_100px_100px] gap-4 p-4 hover:bg-gray-50 transition-colors text-sm"
                  >
                    <div>{product.model}</div>
                    <div>{product.manufacturer}</div>
                    <div className="flex flex-wrap gap-1">
                      {product.applications.map((app) => (
                        <Badge
                          key={app}
                          variant="secondary"
                          className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs"
                        >
                          {app}
                        </Badge>
                      ))}
                    </div>
                    <div>{product.technology}</div>
                    <div>{product.standards}</div>
                    <div>{product.axis}</div>
                    <div>{product.gRange}</div>
                    <div>{product.biasInrun}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}