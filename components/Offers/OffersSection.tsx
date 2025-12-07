import SectionHeader from "@/components/SectionHeader";
import { useOffers } from "@/hooks/useOffers";
import React from "react";
import { View } from "react-native";
import OffersCarousel from "./OffersCarousel";
import OffersSkeleton from "./OffersSkeleton";

export default function OffersSection() {
  const { offers, loading } = useOffers();

  return (
    <View style={{ marginTop: 10 }}>
      <SectionHeader
        title="Special Offers"
        onPressViewAll={() => console.log("View All pressed")}
      />

      {loading ? <OffersSkeleton /> : <OffersCarousel offers={offers} />}
    </View>
  );
}
