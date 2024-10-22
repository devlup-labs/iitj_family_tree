FROM python

WORKDIR /myapp

COPY requirements.txt ./

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# RUN bash ./Script.sh

COPY . .

EXPOSE 8000

CMD [ "python","manage.py","runserver","0.0.0.0:8000","--noreload" ]



