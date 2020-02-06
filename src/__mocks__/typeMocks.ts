import { Gym, Route, User, Wall } from "../types";

export const testRouteOne: Route = {
  averageGrade: "GRADE_5_9",
  averageRating: 4,
  gymId: "gym1",
  holdColor: "Blue",
  id: "route1",
  name: "RouteOne",
  setter: "Luke",
  types: ["TOP_ROPE", "LEAD"],
  wallId: "wall1"
};

export const testRouteTwo: Route = {
  averageGrade: "GRADE_5_12ab",
  averageRating: 4,
  gymId: "gym1",
  holdColor: "Blue",
  id: "route2",
  name: "RouteTwo",
  setter: "Luke",
  types: ["TOP_ROPE", "LEAD"],
  wallId: "wall1"
};

export const testWallOne: Wall = {
  gymId: "gym1",
  id: "wall1",
  name: "Wall1",
  routes: [testRouteOne, testRouteTwo],
  types: ["LEAD", "TOP_ROPE"]
};

export const testWallTwo: Wall = {
  gymId: "gym1",
  id: "wall2",
  name: "Wall1",
  routes: [],
  types: ["LEAD", "TOP_ROPE"]
};

export const testGymOne: Gym = {
  address: "1234 Five Street",
  authorizedEditors: ["id"],
  city: "Ames",
  email: "abc@d.com",
  id: "gym1",
  logoUrl: "",
  name: "Gym One",
  phoneNumber: "1234567890",
  photoUrl: "",
  state: "Iowa",
  walls: [testWallOne, testWallTwo],
  website: "lukeshay.com",
  zipCode: "50014"
};

export const testGymTwo: Gym = {
  address: "1234 Five Street",
  authorizedEditors: ["id"],
  city: "Ames",
  email: "abc@d.com",
  id: "gym2",
  logoUrl: "",
  name: "Gym Two",
  phoneNumber: "1234567890",
  photoUrl: "",
  state: "Iowa",
  walls: [testWallOne, testWallTwo],
  website: "lukeshay.com",
  zipCode: "50014"
};

export const testUser: User = {
  authority: "ADMIN",
  city: "Ames",
  country: "USA",
  email: "email",
  firstName: "Name",
  id: "id",
  lastName: "Last",
  password: "password",
  phoneNumber: "1111111111",
  role: "ADMIN_ROLE",
  session: null,
  state: "IA",
  username: "username"
};
