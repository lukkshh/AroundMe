import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

type Category = "pharmacy" | "bakery" | "supermarket" | "other";

type LocationAttributes = {
  id: number;
  name: string;
  category: Category;
  location: object;
};

type LocationCreationAttributes = Optional<LocationAttributes, "id">;

class Location extends Model<LocationAttributes, LocationCreationAttributes> {
  declare id: number;
  declare name: string;
  declare category: Category;
  declare location: object;
}

Location.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.GEOGRAPHY,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "location",
  }
);

export default Location;
