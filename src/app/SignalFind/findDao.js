async function insertUserLocation(connection, params) {
    const query = `
                  INSERT INTO UserLocation(latitude, longitude)
                  VALUES(?,?);
                  `;
    const row = await connection.query(query, params);

    return row;
}

async function updateLocation(connection, params) {
    const query = `
                  UPDATE UserLocation
                  SET latitude = ?, longitude = ?
                  WHERE userIdx = ?;
                  `;
    const [row] = await connection.query(query, params);

    return row;
}

// userLocation Table에서 내 최신 위치 정보 불러오기 " "이 아니라 ' '하니까 되네;;
async function selectUserLocation(connection, userIdx) {
    const query = `
                    SELECT latitude, longitude
                    FROM UserLocation
                    WHERE userIdx = ?;
                  `;
    const [row] = await connection.query(query, userIdx);

    return row;
}


// Siganling Table에서 활성화된 시그널의 SignalArea 정보 가져오기
async function selectSignalLocation(connection,params) {
    const query = `
                SELECT latitude, longitude
                FROM UserLocation
                WHERE userIdx = ? ; 
                  `;
    const [row] = await connection.query(query,params);

    return row;
}

// AR zone Table에서 장소 -> 위도, 경도 받아오기
// async function selectARLocation(connection, signalPromiseArea) {
//     const query = `
//                     SELECT latitude, longitude
//                     FROM ARzone
//                     WHERE address = ? ;
//                   `;
//     const [row] = await connection.query(query, signalPromiseArea);

//     return row;
// }

//AR zone Table에서 위도, 경도 -> 장소
async function getAddressByLocation(connection, params){
    const query = `
                    SELECT latitude, longitude
                    FROM ARzone
                    WHERE latitude = ? AND longitude = ?;
                  `;
    const [row] = await connection.query(query, params);

    return row;
}

// Signaling Table에서 장소 -> userIdx 와 sigIdx
// async function getSignalByAddress(connection, param){
//     const query = `
//                     SELECT *
//                     FROM Signaling
//                     WHERE sigPromiseArea IN ?
//                     LIMIT ?, ?; 
//                  `;
//     const [row] = await connection.query(query, param);
//     return row ;
    
//     /*
//     row
//     ----------------------------------------
//     [{signalidx : 8 }, {signalIdx : none} ]
//     ----------------------------------------
//     */
// }

async function getSignalStatus(connection, params){
    const query = `
                    SELECT up.*, u.nickName, s.signalIdx, s.sigPromiseArea, s.sigPromiseTime, s.checkSigWrite
                    FROM Signaling AS s
                            LEFT JOIN User AS u ON s.userIdx = u.userIdx
                            LEFT JOIN UserProfile AS up ON s.userIdx = up.userIdx
                    WHERE s.sigStatus = 1;
                 `;
    const [row] = await connection.query(query, params);
    return row ;
    
    /*
    row
    ----------------------------------------
    [{signalidx : 8 }, {signalIdx : none} ]
    ----------------------------------------
    */
}


module.exports = {
    insertUserLocation, // 1
    updateLocation, // 2
    selectUserLocation, // 3
    selectSignalLocation, // 4
    // selectARLocation, // 5
    // getAddressByLocation, // 6
    // getSignalByAddress, // 7
    getSignalStatus // 8
};