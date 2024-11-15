import PageContainer from "@/components/PageContainer";
import { ThemedText } from "@/components/ThemedText";
import { CarEntity } from "@/entities/car.entity";
import useDb from "@/hooks/useDb";
import useTranslate from "@/hooks/useTranslate";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";

export default function ViewCar() {
  const { t } = useTranslate();
  const [car, setCar] = useState<CarEntity | undefined>();
  const db = useDb();
  const local = useLocalSearchParams();

  const carId = useMemo(() => {
    if (!local || !local.id) {
      return undefined;
    }
    return +local.id;
  }, [local]);

  useEffect(() => {
    (async () => {
      if (!carId) {
        return;
      }
      const carEntity = await db.getCar(carId!);
      setCar(carEntity || undefined);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer
      headerOptions={{
        bgResource: require("../../assets/images/pages/add_edit_car.png"),
        title: car?.display_name || t("ui.viewCar.viewCar"),
        backButton: {
          buttonText: t("ui.home.home"),
          href: "/"
        }
      }}
    >
      <ThemedText>{car?.make}</ThemedText>
    </PageContainer>
  );
}
