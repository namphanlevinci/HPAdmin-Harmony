import { Ability, AbilityBuilder } from "@casl/ability";
import configureStore from "../store";
const { store } = configureStore();

function subjectName(item) {
  if (!item || typeof item === "string") {
    return item;
  }
  return item.__type;
}

const ability = new Ability([], { subjectName });

let currentAuth;
store.subscribe(() => {
  const prevAuth = currentAuth;
  currentAuth = store.getState().userReducer.User;
  console.log("currentAuth", currentAuth);
  if (prevAuth !== currentAuth) {
    ability.update(defineRulesFor(currentAuth));
  }
});

function defineAbilityFor(user) {
  const { can, cannot, rules } = new AbilityBuilder();

  if (user.role === "admin") {
    can("manage", "all"); // read-write access to everything
  } else {
    can("read", "all"); // read-only access to everything
  }

  cannot("delete", "Post", { published: true });

  return new Ability(rules);
}
