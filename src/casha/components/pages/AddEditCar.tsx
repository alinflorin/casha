import useTranslate from "@/hooks/useTranslate";
import PageContainer from "../PageContainer";
import { ThemedText } from "../ThemedText";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { CarEntity } from "@/entities/car.entity";
import useDb from "@/hooks/useDb";

export default function AddEditCar() {
  const db = useDb();
  const { t } = useTranslate();
  const searchParams = useLocalSearchParams();
  const [car, setCar] = useState<CarEntity>({
    display_name: "",
    make: "",
    model: "",
    vin: "",
    year: new Date().getFullYear()
  });

  const editedCarId = useMemo(() => {
    if (!searchParams || !searchParams.id) {
      return undefined;
    }
    return +searchParams.id;
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      if (!editedCarId) {
        return;
      }
      const editedCar = await db.getCar(editedCarId);
      if (!editedCar) {
        throw new Error("Car doesn't exist.");
      }
      setCar(editedCar);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer
      headerOptions={{
        bgResource: require("../../assets/images/pages/add_edit_car.png"),
        title: t(
          editedCarId ? "ui.addEditCar.editCar" : "ui.addEditCar.addCar"
        ),
        canGoBack: true,
        backButtonOptions: {
          buttonText: t("ui.home.home"),
          href: "/"
        }
      }}
    >
      <ThemedText>asd</ThemedText>
    </PageContainer>
  );
}
