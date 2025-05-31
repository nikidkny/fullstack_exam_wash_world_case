import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";

type LocationCardProps = {
  name: string;
  address: string;
  open_hours: string;
  has_self_wash: boolean;
};

export default function LocationCard({ name, address, open_hours, has_self_wash }: LocationCardProps) {
  return (
    <Card className="p-5 rounded-lg max-w-[360px] m-3 bg-gray-100">
      {/* Top section: icon and title */}
      <HStack className="items-center mb-4">
        <Avatar className="mr-3">
          <AvatarImage source={require("./../../assets/WashWorld_lokation-e1618300360483.jpeg")} alt="location image" />
        </Avatar>
        <Heading size="md">{name}</Heading>
      </HStack>

      {/* Middle: location info */}
      <VStack className="mb-3 space-y-1 flex gap-3">
        <Text size="sm" className="text-gray-600">
          📍 {address}
        </Text>
        <Text size="sm" className="text-gray-600">
          🕒 {open_hours}
        </Text>
        <Text size="sm" className={`font-medium ${has_self_wash ? "text-green-600" : "text-red-500"}`}>
          {has_self_wash ? "✅ Self-wash available" : "❌ No self-wash available"}
        </Text>
      </VStack>
    </Card>
  );
}
