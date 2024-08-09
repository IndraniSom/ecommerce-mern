import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
// Remove the unused imports

export function SignupFormDemo({ onChange }: { onChange: React.ChangeEventHandler<HTMLInputElement> }) {
  return (
    <div className="w-full rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white">
      <h2 className="font-bold text-xl text-neutral-800">Checkout</h2>
      <form className="my-8">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="shippingAddress1">Shipping Address</Label>
            <Input
              id="shippingAddress1"
              name="shippingAddress1"
              placeholder="123 Main St"
              type="text"
              onChange={onChange}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              placeholder="City"
              type="text"
              onChange={onChange}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="postal">Postal Code</Label>
          <Input
            id="postal"
            name="postal"
            placeholder="12345"
            type="text"
            onChange={onChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            placeholder="Country"
            type="text"
            onChange={onChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="123-456-7890"
            type="text"
            onChange={onChange}
          />
        </LabelInputContainer>
      </form>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
