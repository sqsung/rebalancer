import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/modules/shared";
import { CalculatorPage } from "@/modules/calculator";
import { SettingsPage } from "@/modules/settings";
import { PATHS } from "@/constants";

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={PATHS.calculator} element={<CalculatorPage />} />
        <Route path={PATHS.settings} element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
