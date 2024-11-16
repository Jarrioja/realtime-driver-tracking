# Realtime Driver Tracking

This project is a real-time driver tracking application built with React, TypeScript, and Vite. It utilizes Google Maps for location tracking and Supabase for backend services.

## Features

- Real-time tracking of driver location
- Distance calculation between driver and customer
- Responsive design using Tailwind CSS
- Easy to set up and run locally

## Technologies Used

- **React**: A JavaScript library for building user interfaces
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript
- **Vite**: A fast build tool for modern web projects
- **Tailwind CSS**: A utility-first CSS framework for styling
- **Supabase**: An open-source Firebase alternative for backend services
- **Google Maps API**: For displaying maps and handling geolocation

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/realtime-driver-tracking.git
   cd realtime-driver-tracking
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```plaintext
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Usage

- The application will initialize the map and display the driver's location.
- You can drag the driver's marker to update their location in real-time.
- The distance between the driver and the customer will be displayed on the screen.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.io/)
- [Google Maps API](https://developers.google.com/maps)
