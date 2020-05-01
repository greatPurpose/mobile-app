import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';

const Sign_Up = gql`
  mutation ($first_name: String!,
    $last_name: String!,
    $user_email: String!,
    $user_registered: time!,
    $user_pass : String!,
    $user_nicename: String!
    $phone_number : String!){
    insert_users (
      objects: [{
        first_name: $first_name,
        last_name: $last_name,
        user_email: $user_email,
        user_pass : $user_pass,
        user_registered: $user_registered,
        user_nicename: $user_nicename,
        phone_number: $phone_number
      }]
    ){
      returning {
        id
      }
    }
  }
`;

export default function(variables){
    const [signUp, { data }] = useMutation(Sign_Up,{variables:variables});
    return (
        <TouchableOpacity onPress={signUp}><Text style={commonStyles.contbtn} >Continue</Text></TouchableOpacity>
      );
}
