import React from "react";
import { IListItem } from "./CreateRecipe.Form";

import { ListItem, Input, Button } from "@material-ui/core";
import ClearSharpIcon from "@material-ui/icons/ClearSharp";

export interface IRecipeListInput {
  index: number;
  item: IListItem;
  listName: string;
  focused: boolean;
  handleListItemKeyDown: any;
  handleListItemChange: any;
  handleListItemButtonClick: any;
}

const RecipeListInput = ({
  index,
  item,
  listName,
  focused,
  handleListItemButtonClick,
  handleListItemChange,
  handleListItemKeyDown,
}: IRecipeListInput) => {
  return (
    <ListItem key={item.id}>
      <span>{index + 1}.</span>
      <Input
        fullWidth
        value={item.value}
        onKeyDown={(e) => handleListItemKeyDown(e, listName)}
        onChange={(e) => handleListItemChange(e, item, listName)}
        inputRef={(input) => focused && input && input.focus()}
      ></Input>
      <Button onClick={(e) => handleListItemButtonClick(e, item, listName)}>
        <ClearSharpIcon />
      </Button>
    </ListItem>
  );
};

export default RecipeListInput;