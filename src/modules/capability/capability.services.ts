import { CapabilityInput } from "./capability.validations";
import { Capability } from "./models/capability.models";

export async function createCapability(
  data: CapabilityInput
): Promise<Capability> {
  const { name, description } = data;

  // normalize input
  const normalizedName = name.trim().toLowerCase();

  // check if already exists
  const existing = await Capability.findOne({
    where: { name: normalizedName },
  });

  if (existing) {
    throw new Error("This capability already exists");
  }

  // create capability
  const capability = await Capability.create({
    name: normalizedName,
    description: description.trim(),
  });

  return capability;
}
