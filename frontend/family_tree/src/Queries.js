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

export const SEARCH_QUERY = gql `
    query StudentType($string: String!) {
        studentSearch(searchQuery: $string) {
            name,
            rollNo,
        }
    }
`;

export const NODE_DETAILS_QUERY = gql `
    query StudentType($rollNo: String!) {
        studentNode(roll: $rollNo) {
            branch,
            year,
            picture,
            homeTown,
            extraCurriculars,
            linkedIn,
            email,
        }
    }
`;