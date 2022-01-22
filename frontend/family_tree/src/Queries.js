import {gql} from "@apollo/client";

export const CHILDREN_QUERY = gql `
    query StudentType($parentId: String!) {
        children(parentId: $parentId) {
            name,
            rollNo,
            id,
            parentId,
        }
    }
`;

export const BATCH_QUERY = gql `
    query StudentType($rollNo: String!) {
        studentBatch(roll: $rollNo) {
            name,
            rollNo,
            id,
            parentId,
        }
    }
`;

export const PATH_QUERY = gql `
    query StudentType($rollNo: String!) {
        studentPath(roll: $rollNo) {
            name,
            rollNo,
            id,
            parentId,
        }
    }
`;

export const ALL_QUERY = gql `
    query StudentType {
        students {
            name,
            rollNo,
            id,
            parentId,
        }
    }
`;