import {List,Map} from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

function getWinner(votes){
    if(!vote) return [];
    const [a,b] = votes.get('pair');
    const aVotes = votes.getIn(['tally', a], 0);
    const bVotes = votes.getIn(['tally', b], 0);
    
    if(aVotes > bVotes)         return a;
    else if(aVotes < bVotes)    return b;
    else                        return [a,b];
}

export function next(state){
    const entries = state.get('entries')
                         .concat(state.getWinner(state.get(vote)));
    if(entries.size === 1){
        return state.remove('vote')
                    .remove('entries')
                    .set('winner',entries.first());
    } else {
        return state.merge({
            vote: Map({pair:entries.take(2)}),
            entries: entries.skip(2)
        }); 
    }  
}

export function vote(voteState,entry){
    return voteState.updateIn(
        ['tally',entry],
        0,
        tally => tally+1
    );
}