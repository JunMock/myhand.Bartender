module.exports.function = function findRecipe(id, page) {
  const utils = require("./lib/utils");
  const objects = require("./lib/objects");
  const http = utils.http;
  const console = utils.console;
  const config = utils.config;
  const options = utils.options;
  let searchCock = {};
  let searchRecipe = {};
  let cocktailInfo = objects.cocktailInfo;
  let recipeInfo = objects.recipeInfo;

  searchCock = http.getUrl(config.get("single.url") + id, options);
  cocktailInfo = searchCock.parsed.data;
  cocktailInfo.subCategory = searchCock.parsed.data.category;

  if (cocktailInfo.category.length > 0) {
    if (cocktailInfo.category.split(",").length >= 1) {
      cocktailInfo.category = cocktailInfo.category.split(",")[0];
    }
  }

  if (cocktailInfo.category == undefined) cocktailInfo.category = " ";

  cocktailInfo.id = searchCock.parsed.id;
  if (cocktailInfo.majorCategory == undefined) cocktailInfo.majorCategory = " ";

  searchRecipe = http.getUrl(config.get("recipe.url") + id, options);
  recipeInfo = searchRecipe.parsed.data;
  recipeInfo.id = searchRecipe.parsed.id;
  recipeInfo.steplist = searchRecipe.parsed.data.steps.split("_");
  recipeInfo.cocktail = cocktailInfo;

  return recipeInfo;
};
