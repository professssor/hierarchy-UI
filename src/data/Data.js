import { v4 as uuidv4 } from "uuid";
import { generateRandomName } from "../helper/GenerateRandomNames";

export const initialTreeData = [
  {
    id: uuidv4(),
    text: "CEO",
    name: generateRandomName(),
    type: "CEO",
    diamond: false,
    children: [
      {
        id: uuidv4(),
        text: "HR",
        name: generateRandomName(),
        type: "Department",
        diamond: false,
        children: [
          {
            id: uuidv4(),
            text: "Team1",

            type: "team",
            diamond: false,
            children: [
              {
                id: uuidv4(),
                text: "Member 1",
                name: generateRandomName(),
                diamond: false,
                type: "Lead",
              },
              {
                id: uuidv4(),
                text: "Member 2",
                name: generateRandomName(),
                diamond: false,
                type: "member",
              },
              {
                id: uuidv4(),
                text: "Member 4",
                name: generateRandomName(),
                diamond: false,
                type: "member",
              },
              {
                id: uuidv4(),
                text: "Member 5",
                name: generateRandomName(),
                diamond: false,
                type: "member",
              },
            ],
          },
        ],
      },
      {
        id: uuidv4(),
        text: "Engineering",
        name: generateRandomName(),
        diamond: false,
        type: "Department",
        children: [
          {
            id: uuidv4(),
            text: "Team 1",

            type: "team",
            diamond: false,
            children: [
              {
                id: uuidv4(),
                text: "Member 1",
                name: generateRandomName(),
                diamond: false,
                type: "Lead",
              },
              {
                id: uuidv4(),
                text: "Member 2",
                name: generateRandomName(),
                diamond: false,
                type: "member",
              },
            ],
          },
          {
            id: uuidv4(),
            text: "Team 3",

            type: "team",
            diamond: false,
            children: [
              {
                id: uuidv4(),
                text: "Member 1",
                name: generateRandomName(),
                diamond: false,
                type: "member",
              },
            ],
          },
        ],
      },
      {
        id: uuidv4(),
        text: "Design",
        name: generateRandomName(),
        diamond: false,
        type: "Department",
        children: [
          {
            id: uuidv4(),
            text: "Team 1",

            type: "team",
            diamond: false,
            children: [
              {
                id: uuidv4(),
                text: "Member 1",
                name: generateRandomName(),
                diamond: false,
                type: "Lead",
              },
              {
                id: uuidv4(),
                text: "Member 2",
                name: generateRandomName(),
                diamond: false,
                type: "member",
              },
            ],
          },
          {
            id: uuidv4(),
            text: "Team 2",

            type: "team",
            diamond: false,
            children: [
              {
                id: uuidv4(),
                text: "Member 1",
                name: generateRandomName(),
                diamond: false,
                type: "Lead",
              },
              {
                id: uuidv4(),
                text: "Member 2",
                name: generateRandomName(),
                diamond: false,
                type: "member",
              },
            ],
          },
        ],
      },
      {
        id: uuidv4(),
        text: "Chemical",
        name: generateRandomName(),
        diamond: false,
        type: "Department",
        children: [
          {
            id: uuidv4(),
            text: "Team 1",

            type: "team",
            diamond: false,
            children: [
              {
                id: uuidv4(),
                text: "Member 1",
                name: generateRandomName(),
                diamond: false,
                type: "Lead",
              },
              {
                id: uuidv4(),
                text: "Member 2",
                name: generateRandomName(),
                diamond: false,
                type: "member",
              },
            ],
          },
        ],
      },
    ],
  },
];
