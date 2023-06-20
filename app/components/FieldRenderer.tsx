import { Input, Checkbox } from "native-base";
import { FieldType } from "../features/fieldSlice";

type FieldProps = {
  type: FieldType;
  placeholder: string;
};

export default function FieldRenderer({ type, placeholder }: FieldProps) {
  switch (type) {
    case FieldType.Text:
      return <Input placeholder={placeholder} />;
    case FieldType.Checkbox:
      return <Input placeholder={placeholder} />;
    case FieldType.Number:
      return <Input keyboardType="numeric" placeholder={placeholder} />;
    // case FieldType.Date:
    //   return <DatePicker />;
    default:
      return null;
  }
}
