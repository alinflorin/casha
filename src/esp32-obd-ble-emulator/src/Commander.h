#include <CAN.h> // the OBD2 library depends on the CAN library
#include <OBD2.h>
#include <OBDCommanderStruct.h>
#include <MyBLE.h>

class OBDCommander
{
private:
#ifdef ARDUINO_ARCH_ESP32
    HardwareSerial *transceiver;
#else
    SoftwareSerial *transceiver;
#endif
    String formatOBDPackage(short pid, uint8_t data);
    decodeOBDFromSlave obdWatchCallBack;
    decodedOBDPackage obdDecodedOBDPackageCallBack;
    MyBLE *pMyBLELid;
    /* data */
public:
    OBDCommander(/* args */);
    ~OBDCommander();

#ifdef ARDUINO_ARCH_ESP32
    void init(HardwareSerial *softSerial, MyBLE *myBLE);
#else
    void init(SoftwareSerial *softSerial);
#endif
    void process();
    void initWatchCallBack(decodeOBDFromSlave callBack);
    void initWatchParsedCallBack(decodedOBDPackage callback);
    void watch();
    void writeOBDPackage(obd_commander_struct commander_struct);
    void writeOBDPackage(short pid, String data);
    void writeOBDPackage(short pid, uint32_t data);
    void writeOBDPackage(short pid, float data);
};

void OBDCommander::initWatchParsedCallBack(decodedOBDPackage callback)
{
    obdDecodedOBDPackageCallBack = callback;
}

void OBDCommander::initWatchCallBack(decodeOBDFromSlave callBack)
{
    obdWatchCallBack = callBack;
}

OBDCommander::OBDCommander()
{
}

OBDCommander::~OBDCommander()
{
}
void OBDCommander::watch()
{
    if (transceiver->available() > 0)
    {
        String data = transceiver->readStringUntil('\n');
        if (obdWatchCallBack != nullptr)
        {
            obd_commander_struct decoded = obdWatchCallBack(data);
#ifdef DEBUG_DATA_LOG
            // Serial.println(decoded.obd_pid)
#endif
            if (obdDecodedOBDPackageCallBack != nullptr)
            {
                obdDecodedOBDPackageCallBack(decoded, pMyBLELid);
            }
        }
    }
}

void OBDCommander::writeOBDPackage(short pid, float data)
{

#ifdef DEBUG_DATA_LOG
    Serial.println(data);
#endif

    transceiver->print(pid);
    transceiver->print(":");
    transceiver->println(data);
    delay(100);
}

void OBDCommander::writeOBDPackage(short pid, uint32_t data)
{
#ifdef DEBUG_DATA_LOG
    Serial.println(data);
#endif
    transceiver->println(data);
    delay(100);
}

void OBDCommander::init(HardwareSerial *softSerial, MyBLE *myBLE)
{
    transceiver = softSerial;
    pMyBLELid = myBLE;
}

OBDCommander Commander;
