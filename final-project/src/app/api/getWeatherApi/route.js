export async function GET(req, res) {
    console.log("In the weather API page"); // Debugging log
  
    try {
      // Fetch weather data from the external Weather API
      const res2 = await fetch(
        "http://api.weatherapi.com/v1/current.json?key=6dcc4b2071aa4759a99124451241610&q=Dublin&aqi=no"
      );
  
      if (!res2.ok) {
        throw new Error("Failed to fetch weather data");
      }
  
      const data = await res2.json();
  
      console.log(data.current.temp_c); // Debugging log for temperature
  
      // Return temperature and weather icon in the response
      return Response.json({
        temp: data.current.temp_c,
        icon: data.current.condition.icon,
      });
    } catch (error) {
      console.error("Error in weather API:", error);
      return Response.json({ error: "Unable to fetch weather data" }, { status: 500 });
    }
  }
  